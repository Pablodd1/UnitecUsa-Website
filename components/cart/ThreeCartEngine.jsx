"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Box, Weight, ChevronRight, Info } from "lucide-react"

/**
 * ThreeCartEngine v5.1 Pro: Advanced Cinematic Logistics Engine
 * Features:
 * - Real-time Physics-based Material Lighting
 * - Dynamic Item Overlays (Hover Labels)
 * - Cinematic HUD with Real-time Metrics
 * - Ambient Particle System
 * - Restricted Orbital Control
 */
export default function ThreeCartEngine({ items = [], products = {}, container = {} }) {
    const mountRef = useRef(null)
    const sceneRef = useRef({
        scene: null,
        camera: null,
        renderer: null,
        controls: null,
        containerGroup: null,
        itemsGroup: null,
        raycaster: new THREE.Raycaster(),
        mouse: new THREE.Vector2(),
        hoveredItem: null,
        particles: null
    })

    const [stats, setStats] = useState({ percent: 0, count: 0, weight: 0 })
    const [isFull, setIsFull] = useState(false)
    const [hoveredData, setHoveredData] = useState(null)

    // --- UTILS: Procedural Texture Generator ---
    const createCardboardTexture = (name = "") => {
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 512
        const ctx = canvas.getContext('2d')

        // Base Cardboard
        ctx.fillStyle = '#9b836a'
        ctx.fillRect(0, 0, 512, 512)

        // Grain/Noise
        for (let i = 0; i < 8000; i++) {
            ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.08})`
            ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2)
        }

        // Branding Area
        ctx.fillStyle = 'white'
        ctx.globalAlpha = 0.8
        ctx.fillRect(40, 40, 240, 140)
        ctx.globalAlpha = 1.0

        // Text
        ctx.fillStyle = '#222'
        ctx.font = 'bold 36px Montserrat, sans-serif'
        ctx.fillText("L-STREAM", 60, 90)
        ctx.font = '22px monospace'
        ctx.fillText(name.substring(0, 18).toUpperCase(), 60, 130)

        // Technical markings
        ctx.strokeStyle = '#444'
        ctx.lineWidth = 2
        ctx.strokeRect(40, 40, 240, 140)
        
        // Barcode
        for (let i = 0; i < 40; i++) {
            ctx.fillStyle = Math.random() > 0.4 ? '#000' : 'transparent'
            ctx.fillRect(60 + (i * 5), 150, 3, 25)
        }

        const texture = new THREE.CanvasTexture(canvas)
        texture.anisotropy = 16
        return texture
    }

    // --- SCENE SETUP ---
    useEffect(() => {
        const el = mountRef.current
        if (!el) return

        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x020202)
        scene.fog = new THREE.FogExp2(0x000000, 0.04)
        sceneRef.current.scene = scene

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        })
        renderer.setSize(el.clientWidth, el.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        el.appendChild(renderer.domElement)
        sceneRef.current.renderer = renderer

        const camera = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, 0.1, 1000)
        camera.position.set(12, 8, 14)
        sceneRef.current.camera = camera

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.maxPolarAngle = Math.PI / 2.1
        controls.minDistance = 6
        controls.maxDistance = 30
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.4
        sceneRef.current.controls = controls

        // Lighting
        scene.add(new THREE.AmbientLight(0xffffff, 0.4))
        
        const mainLight = new THREE.SpotLight(0xffffff, 100)
        mainLight.position.set(10, 20, 10)
        mainLight.angle = 0.4
        mainLight.penumbra = 0.5
        mainLight.castShadow = true
        mainLight.shadow.mapSize.set(2048, 2048)
        scene.add(mainLight)

        const accentLight = new THREE.PointLight(0x3b82f6, 20, 30) // Brand Blue
        accentLight.position.set(-10, 5, 5)
        scene.add(accentLight)

        const accentLight2 = new THREE.PointLight(0xffffff, 10, 20)
        accentLight2.position.set(10, 5, -10)
        scene.add(accentLight2)

        // Particles
        const partGeo = new THREE.BufferGeometry()
        const count = 1000
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 50
        partGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        const partMat = new THREE.PointsMaterial({ size: 0.02, color: 0x444444, transparent: true, opacity: 0.4 })
        const particles = new THREE.Points(partGeo, partMat)
        scene.add(particles)
        sceneRef.current.particles = particles

        // Container Group
        const containerGroup = new THREE.Group()
        scene.add(containerGroup)
        sceneRef.current.containerGroup = containerGroup

        const itemsGroup = new THREE.Group()
        containerGroup.add(itemsGroup)
        sceneRef.current.itemsGroup = itemsGroup

        // Container Shell
        const shellGeo = new THREE.BoxGeometry(6.2, 2.6, 2.6)
        const shellMat = new THREE.MeshStandardMaterial({
            color: 0x111111,
            side: THREE.BackSide,
            transparent: true,
            opacity: 0.08,
            roughness: 0,
            metalness: 1
        })
        const shell = new THREE.Mesh(shellGeo, shellMat)
        shell.position.y = 1.3
        containerGroup.add(shell)

        const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(shellGeo),
            new THREE.LineBasicMaterial({ color: 0x222222, transparent: true, opacity: 0.3 })
        )
        edges.position.copy(shell.position)
        containerGroup.add(edges)

        // Render Loop
        const clock = new THREE.Clock()
        let reqId
        const animate = () => {
            reqId = requestAnimationFrame(animate)
            const delta = clock.getDelta()
            const elapsed = clock.getElapsedTime()

            controls.update()
            particles.rotation.y += delta * 0.02
            particles.position.y = Math.sin(elapsed * 0.3) * 0.2

            // Raycasting for Interactivity
            const { raycaster, mouse, itemsGroup, camera } = sceneRef.current
            if (raycaster && itemsGroup && camera) {
                raycaster.setFromCamera(mouse, camera)
                const hits = raycaster.intersectObjects(itemsGroup.children)
                
                if (hits.length > 0) {
                    const hit = hits[0].object
                    if (sceneRef.current.hoveredItem !== hit) {
                        if (sceneRef.current.hoveredItem) {
                            sceneRef.current.hoveredItem.material.emissive.setHex(0x000000)
                        }
                        sceneRef.current.hoveredItem = hit
                        hit.material.emissive.setHex(0x222222)
                        setHoveredData({
                            name: hit.userData.name,
                            dims: hit.userData.dims,
                            weight: hit.userData.weight
                        })
                    }
                } else {
                    if (sceneRef.current.hoveredItem) {
                        sceneRef.current.hoveredItem.material.emissive.setHex(0x000000)
                        sceneRef.current.hoveredItem = null
                        setHoveredData(null)
                    }
                }
            }

            renderer.render(scene, camera)
        }
        animate()

        const onMouseMove = (e) => {
            const rect = el.getBoundingClientRect()
            sceneRef.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
            sceneRef.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        }
        el.addEventListener('mousemove', onMouseMove)

        return () => {
            cancelAnimationFrame(reqId)
            el.removeEventListener('mousemove', onMouseMove)
            renderer.dispose()
            if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
        }
    }, [])

    // --- PACKING LOGIC ---
    useEffect(() => {
        const { itemsGroup } = sceneRef.current
        if (!itemsGroup) return

        itemsGroup.clear()
        const flat = []
        items.forEach(it => {
            const count = parseInt(it.qty) || 0
            for (let i = 0; i < count; i++) flat.push({ ...it })
        })

        const cL = (container?.meta?.internal?.length || 600) / 100
        const cW = (container?.meta?.internal?.width || 240) / 100
        const cH = (container?.meta?.internal?.height || 240) / 100

        let cx = -cL/2 + 0.1
        let cy = 0
        let cz = -cW/2 + 0.1
        let maxL = 0
        let maxH = 0

        flat.forEach((it, idx) => {
            const prod = products[it.id] || {}
            const dim = prod.dimensions?.metric || { length: 200, width: 60, thickness: 8 }
            
            const l = (dim.length || 200) / 100
            const w = (dim.width || 60) / 100
            const h = ((dim.thickness || 8) / 100) * 4

            if (cz + w > cW/2) {
                cz = -cW/2 + 0.1
                cx += maxL
                maxL = 0
            }
            if (cx + l > cL/2) {
                cx = -cL/2 + 0.1
                cy += maxH
                maxH = 0
            }

            const boxGeo = new THREE.BoxGeometry(l, h, w)
            const boxMat = new THREE.MeshStandardMaterial({
                map: createCardboardTexture(prod.name || "Cargo"),
                roughness: 0.8,
                metalness: 0.2
            })
            const box = new THREE.Mesh(boxGeo, boxMat)
            box.position.set(cx + l/2, cy + h/2, cz + w/2)
            box.castShadow = true
            box.receiveShadow = true
            box.userData = { name: prod.name, dims: dim, weight: 420 }
            
            // Staggered Entrance
            box.scale.set(0,0,0)
            setTimeout(() => {
                const start = performance.now()
                const grow = (t) => {
                    const progress = Math.min((t - start) / 400, 1)
                    const s = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 3) // Ease out cubic
                    box.scale.set(s,s,s)
                    if (progress < 1) requestAnimationFrame(grow)
                }
                requestAnimationFrame(grow)
            }, idx * 30)

            itemsGroup.add(box)
            cz += w + 0.05
            maxL = Math.max(maxL, l + 0.05)
            maxH = Math.max(maxH, h + 0.05)
        })

        const saturation = Math.min((flat.length / 40) * 100, 100)
        setStats({ percent: saturation, count: flat.length, weight: flat.length * 420 })
        setIsFull(saturation > 98)

    }, [items, products, container])

    return (
        <div className="relative w-full h-full bg-[#050505] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group">
            {/* 3D Canvas */}
            <div ref={mountRef} className="absolute inset-0 z-0" />

            {/* Cinematic Interface HUD */}
            <div className="absolute inset-0 z-10 p-12 pointer-events-none flex flex-col justify-between">
                
                {/* Header: System Metrics */}
                <div className="flex justify-between items-start">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <span className="bg-blue-600 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest text-white">
                                SIMULATION ACTIVE
                            </span>
                            <div className="flex gap-1.5">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-blue-500 animate-pulse' : 'bg-white/10'}`} />
                                ))}
                            </div>
                        </div>
                        <h2 className="text-6xl font-black italic text-white tracking-tighter uppercase leading-none">
                            CORE <span className="text-blue-500 opacity-80">v5.1 Pro</span>
                        </h2>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-right"
                    >
                        <div className="inline-flex flex-col items-end px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Status</span>
                            <span className="text-xl font-black text-white italic">
                                {isFull ? "CAPACITY_MAX_REACHED" : "OPTIMIZING_VECTORS..."}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Center: Dynamic Interaction Panel */}
                <div className="flex-1 flex items-center justify-end">
                    <AnimatePresence>
                        {hoveredData && (
                            <motion.div
                                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                                className="bg-black/60 backdrop-blur-2xl border border-blue-500/30 p-8 rounded-[2rem] max-w-sm w-full shadow-2xl"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-600/20 rounded-xl">
                                        <Box className="text-blue-500" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Selected Item</p>
                                        <h3 className="text-2xl font-black text-white italic truncate tracking-tight">{hoveredData.name}</h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-white/40 uppercase font-bold">Volume Metric</p>
                                        <p className="text-lg font-black text-white italic">
                                            {hoveredData.dims.length}x{hoveredData.dims.thickness}x{hoveredData.dims.width} CM
                                        </p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[10px] text-white/40 uppercase font-bold">Standard Weight</p>
                                        <p className="text-lg font-black text-blue-500 italic">420 KG</p>
                                    </div>
                                </div>
                                <div className="mt-8 flex items-center justify-between text-[10px] font-bold text-white/30 tracking-widest uppercase italic">
                                    <span>TRACK_ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer: Multi-Metric HUD */}
                <div className="space-y-8">
                    <div className="flex items-end justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Activity className="text-blue-500 animate-pulse" size={14} />
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Capacity Saturation Flux</span>
                            </div>
                            <div className="flex items-baseline gap-4">
                                <span className="text-9xl font-black italic tracking-tighter text-white leading-none">
                                    {stats.percent.toFixed(0)}<span className="text-4xl text-blue-500 ml-1">%</span>
                                </span>
                                <div className="space-y-1">
                                    <p className="text-lg font-black text-white italic uppercase tracking-tighter">{stats.count} Units Allocated</p>
                                    <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Displacement: {(stats.percent * 0.72).toFixed(2)} M³</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-6">
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1 leading-none">Net Payload Est</p>
                                <p className="text-6xl font-black text-white italic leading-none">{stats.weight.toLocaleString()} <span className="text-sm text-blue-500 font-black tracking-normal ml-1">KG</span></p>
                            </div>
                            <div className="flex gap-2">
                                {[...Array(15)].map((_, i) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ height: 4 }}
                                        animate={{ height: stats.percent > (i * 6.6) ? [12, 24, 12] : 4 }}
                                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.05 }}
                                        className={`w-2 rounded-full ${stats.percent > (i * 6.6) ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : 'bg-white/5'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Industrial Progress Track */}
                    <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                            className={`h-full relative ${isFull ? 'bg-blue-400 shadow-[0_0_30px_rgba(96,165,250,0.8)]' : 'bg-blue-600'}`}
                            animate={{ width: `${stats.percent}%` }}
                            transition={{ type: "spring", stiffness: 30, damping: 12 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[flow_3s_infinite]" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Atmosphere & Textures */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] z-[5]" />
            <div className="absolute inset-0 pointer-events-none vignette opacity-40 z-[5]" />

            <style jsx>{`
                .vignette {
                    background: radial-gradient(circle, transparent 40%, black 150%);
                }
                @keyframes flow {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(100%); }
                }
            `}</style>
        </div>
    )
}
