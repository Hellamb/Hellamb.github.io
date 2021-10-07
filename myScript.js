//Task 1
let x = document.getElementById("topLogoText").innerHTML;
document.getElementById("topLogoText").innerHTML = document.getElementById("botLogoText").innerHTML;
document.getElementById("botLogoText").innerHTML = x;
//Task 1

//Task 2
let trapH = 5;
let trapA = 4;
let trapB = 2;
let square = ((trapA+trapB)/2)*trapH;
let ans = document.createElement("p");
ans.innerHTML = "Trapezoid square: "+ square;
document.getElementById("mainContentHolder").appendChild(ans);
//Task 2

//Task3
if(document.cookie !== "" && confirm("Cookies: " + document.cookie + ". Want to save cookies?"))
{
    document.getElementById("reverseForm").setAttribute("class", "hidden");
}
else
{
    document.cookie = "reversed=0;max-age=0";
}

function reversClick()
{
    let num = document.getElementById("reverseInput").value;
    num = num.split("").reverse().join("");
    document.cookie = "reversed="+num;
    alert(num);
}
//Task3

//Task4
let item = localStorage.getItem("aligned");
if(item !=null)
{
    document.getElementById(item).style.justifyContent = "left";
    document.getElementById(item).style.paddingLeft = "25px";
    document.getElementById(item+"-radio").checked = true;
}

function alignFunc()
{
    let rad = document.getElementsByName("aligner");
    document.getElementById("right-main").style.justifyContent = "center";
    document.getElementById("main-main").style.justifyContent = "center";
    document.getElementById("nav").style.justifyContent = "center";
    for(let i=0; i<rad.length; i++)
    {
        if(rad[i].checked)
        {
            document.getElementById(rad[i].value).style.justifyContent = "left";
            document.getElementById(rad[i].value).style.paddingLeft = "25px";
            localStorage.setItem("aligned", rad[i].value);
        }
    }
}
//Task4

//Task5
//создание элементов в localStorage
localStorage.setItem("listItems-1","");
localStorage.setItem("listItems-2","");
let mass = "";
let saved = { "1":false, "2":false}

function listCreator(current)
{
    document.getElementById("numListBlock-"+current).setAttribute("class", "");
    document.getElementById("listCreator-"+current).setAttribute("class", "hidden");
}

function addListElement(current)
{
    //создание элемента списка
    let addedText = document.getElementById(`numListForm-${current}`).childNodes[1].value;
    let li = document.createElement("li");
    li.setAttribute("class", `listItem-${current}`);
    let index = document.getElementsByClassName(`listItem-${current}`).length;
    li.setAttribute("index", index.toString());
    li.innerHTML = addedText+"<button onclick=\'deleteListElement( this,"+current+")\'>del</button>";
    document.getElementById(`numList-${current}`).appendChild(li);

    //добавление в localStorage
    // let mass = localStorage.getItem(`listItems-${current}`);
    mass = mass.split(";$;")
    mass.push(addedText);
    mass = mass.join(";$;");
    // localStorage.setItem(`listItems-${current}`,mass);
}
function deleteListElement(me, current)
{
    let index = me.parentElement.getAttribute("index");
    // //удаление из localStorage
    if(saved[current.toString()]) mass = localStorage.getItem(`listItems-${current}`);
     mass = mass.split(";$;");
     mass.splice(index, 1);
     mass = mass.join(";$;")
    if(saved[current.toString()]) localStorage.setItem(`listItems-${current}`, mass);

    //удаление из HTML
    me.parentElement.parentElement.removeChild(me.parentElement);

    //распределение новых индексов
    let elemList = document.getElementsByClassName(`listItem-${current}`);
    for(let i = 0; i<elemList.length;i++)
    {
        elemList[i].setAttribute("index", i);
    }
}

function listSaver(current)
{
    localStorage.setItem(`listItems-${current}`, mass);
    document.getElementById(`numListForm-${current}`).setAttribute("class","hidden" );
    saved[current] = true;
}

//Task5