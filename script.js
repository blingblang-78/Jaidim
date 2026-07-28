let letters = [
    "y",
    "s",
    "w",
    "g",
    "a",
    "h",
    "i"
]

let wordsele = document.getElementById("words")

function getcenterletter() {
    return letters[3]
}

function letter(ltr) {
    let lett = prompt("Enter the letter")
    if (lett !== null) {
        console.log(lett.length)
        if (lett.length == 1) {
            letters[ltr] = lett
            document.getElementById(`ltr${ltr}`).textContent = lett
        } else {
            alert("The letter entered should be 1 character long")
        }
    }
}

function reset() {
    letters = [
        "y",
        "s",
        "w",
        "g",
        "a",
        "h",
        "i"
    ]
    for (let index = 0; index < letters.length; index++) {
        const element = letters[index];
        document.getElementById(`ltr${index}`).textContent = element
    }
    let children = Array.from(wordsele.children)
        for (let index = 0; index < children.length; index++) {
            const element = children[index];
            element.remove()
        }
}

function check() {
    fetch("words.csv").then(res => res.text()).then(text => {
        let dictionnary = text.split(/\r?\n/);
        console.log(dictionnary.length)
        let importantletter = getcenterletter()
        let pangram = true;//useless stuff im lazy to remove this line
        let words = []
        let pangrams = []
        for (let index = 0; index < dictionnary.length; index++) {
            const element = dictionnary[index].toLocaleLowerCase();
            if (element.length < 4) {
                continue;
            }
            let nope = false;
            let pangranny = true;//ok pangranny lets get you to bed
            if (pangram) {
                for (let index2 = 0; index2 < letters.length; index2++) {
                    const letter = letters[index2];
                    if (!element.includes(letter)) {
                        //nope = true
                        pangranny = false
                    }
                }
            }
            if (pangranny) {
                pangrams.push(element)
            }
            if (nope) {
                continue;
            }
            elementy = element.split("")
            for (let index2 = 0; index2 < elementy.length; index2++) {
                const char = elementy[index2];
                if (!letters.includes(char)) {
                    nope = true;
                }
            }
            if (nope) {
                continue;
            }
            if (!element.includes(importantletter)) {
                continue;
            }

            words.push(element);
        }
        
        let children = Array.from(wordsele.children)
        for (let index = 0; index < children.length; index++) {
            const element = children[index];
            element.remove()
        }

        for (let index = 0; index < words.length; index++) {
            const element = words[index];
            addWord(element,pangrams.includes(element))
        }
    })
}

function addWord(word,pangram) {
    let element = document.createElement("p")
    element.textContent = word;
    element.classList.add("text");
    if (pangram) {
        element.classList.add("text-yellow")
    }
    wordsele.append(element)
    element.addEventListener("click",()=>{
        if (element.style.textDecorationLine == "line-through") {
            element.style.textDecorationLine = ""
        } else {
            element.style.textDecorationLine = "line-through"
        }
    })
} 