import urllib.request,json

def retrieve_all():
    my_request = urllib.request.urlopen("https://studies.cs.helsinki.fi/stats-mock/api/courses")
    data = my_request.read()
    info = json.loads(data)
    l=[]
    for course in info:
        if course["enabled"]==True:
            s=course["fullName"],course["name"],course["year"],sum(course["exercises"])
            print(s)
            l.append(s)
    return l

def retrieve_course(course_name: str):
    link=""
    link="https://studies.cs.helsinki.fi/stats-mock/api/courses/"+course_name+"/stats"
    my_request = urllib.request.urlopen(link)
    data = my_request.read()
    info = json.loads(data)
    print(info)
    results={}
    max_students=0
    weeks=len(info)
    hours=0
    exercises=0
    j=0
    new=2
    try:
        new=info["0"]["students"]
    except:
        j+=1
        print("dassa")
    for i in range(j,len(info)+j):
        exercises+=info[str(i)]["exercise_total"]
        hours+=info[str(i)]["hour_total"]
        if info[str(i)]["students"]>max_students:
            max_students=info[str(i)]["students"]
    hours_average=hours//max_students
    exercises_average=exercises//max_students
    print(weeks,max_students,hours,hours_average,exercises,exercises_average)
    results["weeks"]=weeks
    results["students"]=max_students
    results["hours"]=hours
    results["hours_average"]=hours_average
    results["exercises"]=exercises
    results["exercises_average"]=exercises_average
    return results
if __name__ == "__main__":
    print(retrieve_course("CCFUN"))
    