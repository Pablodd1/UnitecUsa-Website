#!/bin/bash

# Function to extract file ID from Google Drive URL
get_file_id() {
    # Simple extraction without -P flag
    echo "$1" | sed -n 's|.*\/file\/d\/\([a-zA-Z0-9_-]*\).*|\1|p'
}

# Function to download from Google Drive
download_gdrive() {
    local url="$1"
    local output="$2"
    local file_id=$(get_file_id "$url")

    if [ -z "$file_id" ]; then
        echo "  ❌ Invalid URL: $url"
        return 1
    fi

    local direct_url="https://drive.google.com/uc?export=download&id=$file_id"

    echo "  📥 Downloading: $(basename "$output")"
    curl -L -J -o "$output" "$direct_url" 2>/dev/null

    if [ $? -eq 0 ] && [ -f "$output" ] && [ -s "$output" ]; then
        echo "  ✅ Downloaded: $(basename "$output")"
        return 0
    else
        echo "  ❌ Failed: $(basename "$output")"
        rm -f "$output"
        return 1
    fi
}

# Files to download
declare -A downloads=(
    ["11_FT_Lamina_Sintetica"]="https://drive.google.com/file/d/15f7vWN4SBQRBwx0JPJruB2W1vs7NUhx2/view?usp=drive_link"
    ["12_FT_Foam_Board"]="https://drive.google.com/file/d/1dggg0rXoKmrH3QT-ya_upyrXqyT87h0s/view?usp=drive_link"
    ["13_FT_Rollo_Adhesivo_Marmol"]="https://drive.google.com/file/d/1pIgqKZV_25nYlbGWfxH2lwouBLOMc7GZ/view?usp=drive_link"
    ["14_FT_Panel_WPC_Exterior"]="https://drive.google.com/file/d/1KhcXOiZgTHpzM7mizu-al8B6ASMsBFZj/view?usp=drive_link"
    ["15_FT_Panel_WPC_Interior"]="https://drive.google.com/file/d/1gFl9UWUrsH3XXWTqSS-9taupsGPb6D-U/view?usp=drive_link"
    ["16_FT_Panel_WPC_Interior_Redondo"]="https://drive.google.com/file/d/1XL4JDyEgRpRIwjAsLjWlgCCyNxAloIHn/view?usp=drive_link"
    ["17_FT_Paneles_acolchados"]="https://drive.google.com/file/d/1b9r87FAGGFdZhXrjkXJ34ePpU8yTrPMk/view?usp=drive_link"
    ["18.1_FT_Panel_Acustico_Tipo_1"]="https://drive.google.com/file/d/1zFK2T0Ij4-oHxZwZOc6kxHSZgZtHxHUC/view?usp=drive_link"
    ["18.2_FT_Panel_Acustico_Tipo_2"]="https://drive.google.com/file/d/1W2rgcHJD93tVdu7B-F47Hn-Mdn638mkD/view?usp=drive_link"
    ["18.3_FT_Panel_Acustico_Tipo_3"]="https://drive.google.com/file/d/14OzUd7O8SFPUhnpaAAiut1bQLXMSpj2f/view?usp=drive_link"
    ["18.4_FT_Panel_Acustico_Tipo_4"]="https://drive.google.com/file/d/1UiWwxWa2EKxzJjrJoQatICxHh_Viy3F8/view?usp=drive_link"
    ["18.5_FT_Panel_Acustico_Tipo_5"]="https://drive.google.com/file/d/1NX2-Fpgl9O9GBbBklsjN8xvx9zyYk9TW/view?usp=drive_link"
    ["18.6_FT_Panel_Acustico_Tipo_6"]="https://drive.google.com/file/d/1iFbPZf1xXpv7r4L_93Vw4ix7NDAgF1wi/view?usp=drive_link"
    ["19_FT_Panel_Acrilico_Marmol"]="https://drive.google.com/file/d/1rZcZ1Z9nJgh28GDDq1RKDA8Wu6dCrFhp/view?usp=drive_link"
    ["20_FT_Liston_WPC_Exterior"]="https://drive.google.com/file/d/1CQkItQJc8YcrrL9_01HispARdvuN8uUC/view?usp=drive_link"
    ["21_FT_Liston_PVC_Interior"]="https://drive.google.com/file/d/1KSdSi8pv8ptevXbI5ZuScGdIqnKRXKLG/view?usp=drive_link"
    ["22_FT_Liston_PVC_Cielo_Raso"]="https://drive.google.com/file/d/1ffUyR6EtOQFxuJaFmcvmhWF0Cei9QKIw/view?usp=drive_link"
    ["23_FT_Cielo_Raso_Lamina_PVC"]="https://drive.google.com/file/d/1ElU9IWk3hEz21EhnWDZTCyEIAb1rQ35n/view?usp=drive_link"
    ["24_FT_Zocalo_SPC"]="https://drive.google.com/file/d/16dLCl4M0HGv8tIri0sxhziCX3wpw0ZJb/view?usp=drive_link"
    ["25_FT_Lamina_PVC_Board"]="https://drive.google.com/file/d/1fHM_Ak7KMWRnzT6eR1fOWay6SQDwpRd6/view?usp=drive_link"
    ["26.1_FT_Cubierta_Termoacustica_UPVC_Roma"]="https://drive.google.com/file/d/1SVvVosvOG2boKKEEB5fj1DdN5nHOG5Ik/view?usp=drive_link"
    ["26.2_FT_Cubierta_Termoacustica_UPVC_Blanca_OA"]="https://drive.google.com/file/d/1tR_djdYIoBcdm5RVoZh5BB12tfAcH3Io/view?usp=drive_link"
    ["26.3_FT_Cubierta_Termoacustica_UPVC_Blanca_OB"]="https://drive.google.com/file/d/1uZzty74MjWJKghhGEJ5ae2WsOFUB6pwz/view?usp=drive_link"
    ["26.4_FT_Teja_Termoacustica_UPVC_COLONIAL"]="https://drive.google.com/file/d/1koEV0Lb8PC1Kn4rXKTT2DC_aQpVf_22b/view?usp=drive_link"
    ["26.5_FT_Teja_UPVC_Tipo_Zinc"]="https://drive.google.com/file/d/1MgEyDPrWOi_tAdZLvLG_Y9_8C8aVxZ_z/view?usp=drive_link"
    ["26.6_FT_Cubierta_Acanalada_UPV_Blanca"]="https://drive.google.com/file/d/122xZLjPRPRjn5uvR7Qu6acF9lI665vDY/view?usp=drive_link"
    ["27_FT_Adhesivo_de_Montaje_PEGATEC"]="https://drive.google.com/file/d/1HrXrxTQOqxF6_DQl8Lvc2xI-gwWqVnWN/view?usp=drive_link"
    ["28.1_FT_Iluminacion_Perfil_Led"]="https://drive.google.com/file/d/1YBd2gsPijzmJdzQkX5NdnBpNAtr3DZkk/view?usp=drive_link"
    ["28.2_FT_Iluminacion_Transformador_Perfil_Led"]="https://drive.google.com/file/d/1S1rD6mHyl5rM5y_zOvk4A0bZPmf5eg_j/view?usp=drive_link"
    ["28.3_FT_Iluminacion_Control_Led"]="https://drive.google.com/file/d/1J9y9PHmqAe_lNAv2PKqVoBvH0t5XSNDH/view?usp=drive_link"
    ["29.1_FT_Jardin_Artificial_Exterior"]="https://drive.google.com/file/d/1UjizIbDHB1OvvjOkHmz68d_3Wy1tsV0L/view?usp=drive_link"
    ["29.2_FT_Jardin_Artificial_Interior"]="https://drive.google.com/file/d/1j89qjwt2P81F0H3rbnBr76vybH87a0BV/view?usp=drive_link"
    ["29.3_FT_Jardin_Artificial_Linea_Moss"]="https://drive.google.com/file/d/1De1h60C3N7N9JiAncVl4f0p8ev-V6Hld/view?usp=drive_link"
    ["33_FT_Cinta_Adhesiva_Papel"]="https://drive.google.com/file/d/1zY3-sCMHTFUhN6zCIzHWbAl5sXSAzecH/view?usp=drive_link"
    ["34_FT_Cinta_Adhesiva_Metalica"]="https://drive.google.com/file/d/1dmlQRh7TywUPlWLCzts7PHpB9Bvu5wyj/view?usp=drive_link"
    ["35.1_FT_Fachada_PVC_Exterior"]="https://drive.google.com/file/d/1eVQ43yP8jlZ2XtoeojCQ0xMFNlY53tHK/view?usp=drive_link"
    ["35.2_FT_Fachada_PVC_Muralla_Gris"]="https://drive.google.com/file/d/1eYBBvDFgWjfsMwt889ySxX8k4KM1ibWj/view?usp=drive_link"
    ["35.3_FT_Fachada_PVC_Ambar_Rustico"]="https://drive.google.com/file/d/1iZr5KJpUl0myWrR5l47nSMgc_iE7EmNZ/view?usp=drive_link"
)

echo "=== DOWNLOADING REMAINING TECHNICAL SHEETS ==="
echo ""

# Download each file
count=0
total=${#downloads[@]}

for file in "${!downloads[@]}"; do
    count=$((count + 1))
    echo "[$count/$total] $file"

    # Determine category directory
    case $file in
        11_*|12_*|13_*|25_*)
            dir="downloads/technical_sheets/LAMINAS"
            ;;
        14_*|15_*|16_*|17_*)
            dir="downloads/technical_sheets/PANELES WPC"
            ;;
        18.*|19_*|35.*|37_*)
            dir="downloads/technical_sheets/PAREDES"
            ;;
        23_*)
            dir="downloads/technical_sheets/CIELO RASO PVC"
            ;;
        33_*|34_*)
            dir="downloads/technical_sheets/CINTAS ADHESIVAS"
            ;;
        26.*)
            dir="downloads/technical_sheets/CUBIERTAS"
            ;;
        28.*)
            dir="downloads/technical_sheets/ILUMINACIÓN"
            ;;
        29.*)
            dir="downloads/technical_sheets/JARDINES ARTIFICIALES"
            ;;
        20_*|21_*|22_*)
            dir="downloads/technical_sheets/LISTONES"
            ;;
        27_*)
            dir="downloads/technical_sheets/PEGANTES"
            ;;
        24_*)
            dir="downloads/technical_sheets/ZOCALOS"
            ;;
        *)
            dir="downloads/technical_sheets"
            ;;
    esac

    mkdir -p "$dir"
    download_gdrive "${downloads[$file]}" "$dir/${file}.pdf"
    echo ""
done

echo "=== DOWNLOAD COMPLETE ==="
