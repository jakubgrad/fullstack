import urllib.request,json

def find_nth(haystack, needle, n):
    start = haystack.find(needle)
    while start >= 0 and n > 1:
        start = haystack.find(needle, start+len(needle))
        n -= 1
    return start

def give_definition(name):

    #name="muki"
    link = "https://en.wiktionary.org/w/api.php?action=parse&page="+name+"&format=json"

    my_request = urllib.request.urlopen(link)
    data = my_request.read()
    info = json.loads(data)
    text = info["parse"]["text"]["*"]
    index=find_nth(text,"Finnish",4)
    text=text[index:]
    index=find_nth(text,"Noun",1)
    text=text[index:]
    index=find_nth(text,"<ol>",1)
    end_index=find_nth(text,"</ol>",1)+5
    text=text[index:end_index]
    text2=text.replace('"',"'")
    #print(text)
    return text2

#if __name__=="__main__":
#    print(give_definition("muki"))
