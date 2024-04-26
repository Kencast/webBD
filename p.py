import requests

def get_common_names(species_name):
    url = f"https://api.gbif.org/v1/species/match?name={species_name}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if 'usageKey' in data:
            usage_key = data['usageKey']
            common_names_url = f"https://api.gbif.org/v1/species/{usage_key}/vernacularNames"
            response = requests.get(common_names_url)
            if response.status_code == 200:
                common_names_data = response.json()
                return common_names_data
            else:
                print("Error al obtener los nombres comunes:", response.status_code)

        else:
            print("No se encontró la especie en GBIF.")

    else:
        print("Error al buscar la especie en GBIF:", response.status_code)


with open('hola.csv', 'r', encoding='utf-8') as archivo:
    with open('comun_especies.csv','w', encoding='utf-8') as nuevo:
        i = 0
        n = 0
        for linea in archivo:
            if(i>50): break
            id, nombre, padre=linea.strip().split(",")
            if ' ' in nombre:
                n+=1
                common_names = get_common_names(nombre)
                if common_names:
                    for name in common_names['results']:
                        # if(name['language'] == 'eng'):
                        #     print(n)
                        #     i+=1
                        #     nuevo.write(i+","+id+","+name['vernacularName'])
                        print(name)
                