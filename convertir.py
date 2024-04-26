nombre = ""
tipo = ""
seq = ""
spe = ""
mapa={}
tipos={"unranked", "kingdom", "phylum", "class", "order", "family", "genus", "species"}
esta={}

def separador():
    i = 0
    global nombre, tipo, seq, spe
    nombre = ""
    tipo =""
    seq = ""
    spe = ""
    while linea[i] == ' ':
        i+=1
    if linea[i] < 'A' or linea[i] > 'Z':
        return 0
    while linea[i] != ' ':
        nombre += chr(ord(linea[i]) | (1 << 5))
        i+=1
    j = 1 + i
    while (linea[i] != '=' or linea[i-1] != 'D'):
        i+=1
    i+=1
    while linea[i]!='}':
        seq += linea[i]
        i+=1
    while linea[i] != ']':
        i-=1
    i-=1
    while linea[i] != '[':
        tipo = linea[i] + tipo;
        i-=1
    if tipo not in tipos:
        return 0;
    if tipo != "species":
        return 1
    if linea[j] == '(' or linea[j] == '×':
        while linea[j] != ' ':
            j+=1
        j+=1
    while linea[j] != ' ':
        spe += linea[j]
        j+=1
    spe = " " + spe
    return 1

mapa["kingdom"] = "unranked";
mapa["phylum"] = "kingdom";
mapa["class"] = "phylum";
mapa["order"] = "class";
mapa["family"] = "order";
mapa["genus"] = "family";
esta["unranked"] = True;
esta["kingdom"] = False;
esta["phylum"] = False;
esta["class"] = False;
esta["order"] = False;
esta["family"] = False;
esta["genus"] = False;

with open("dataset.txtree","r",encoding='utf-8') as leer:
    with open('taxon.csv','w', encoding='utf-8') as escribir:
        pila=[]
        linea = leer.readline()
        separador()
        pila.append([tipo, seq])
        escribir.write(seq+","+nombre+","+"null\n")
        n = 1
        while (n < 5116502): #5116502
            linea = leer.readline()
            n+=1
            if not separador():
                continue;
            if tipo != "species":
                t = mapa[tipo];
                while not esta[t]:
                    t = mapa[t]
                while pila[-1][0] != t:
                    esta[pila[-1][0]] = False
                    pila.pop()
                escribir.write(seq+","+nombre+spe+","+pila[-1][1]+"\n")
                pila.append([tipo, seq])
                esta[tipo] = True
            else:
                escribir.write(seq+","+nombre+spe+","+pila[-1][1]+"\n")
