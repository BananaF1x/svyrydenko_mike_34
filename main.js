const input = document.querySelector("#add-text");
const saveBtn = document.querySelector(".add-btn");
const confirmBtn = document.querySelector(".confirm-btn");
const contentList = document.querySelector(".content");

// setId
function setId(num) {
    const arrId = getContent().map(e => e.id);
    let = id = num;
    arrId .forEach(e => {
        if(e == num) id = Math.max.apply(null, arrId) + 1;
    })
    return id;
}

// saveContent
function saveContent(value) {
    if(value != "") {
        const content = JSON.parse(localStorage.getItem("quote")) || [];
        const item = {
            item: value,
            id: setId(content.length + 1)
        }
        content.push(item);
        localStorage.setItem("quote", JSON.stringify(content));
        renderContent(item);
    }
}

// getContent
function getContent() {
    return JSON.parse(localStorage.getItem('quote')) || [];
}

// renderContent
function renderContent(value) {
    const list = document.createElement("li");
    list.className = "content__list";

    list.innerHTML = `
        <p class="content__text" number= "${value.id}">${value.item}</p>
        <div>
            <button class="content__change" number= "${value.id}">change</button>
            <button class="content__delete" number= "${value.id}">delete</button>
        </div>
    `

    contentList.appendChild(list);
}

// removeContent
function removeContent(removeBtn) {
    const content = getContent();
    const newContent = content.filter(item => item.id != removeBtn.getAttribute('number'));
    localStorage.setItem("quote", JSON.stringify(newContent));
    removeBtn.closest("li").remove();
}

// changeContent
function changeContent(changeBtn) {
    const content = getContent();
    const liContent = changeBtn.closest("li").childNodes[1];
    let contentIndex;

    confirmBtn.style.display = "block";
    saveBtn.style.display = "none"
    
    content.forEach((el, index) => {
        if(el.id == changeBtn.getAttribute('number')) contentIndex = index;
    })
    input.value = content[contentIndex].item;

    input.addEventListener("keyup", () => {
        liContent.innerHTML = input.value;
        content[contentIndex].item = input.value;
        localStorage.setItem("quote", JSON.stringify(content));
    })
}

saveBtn.addEventListener("click", () => {
    saveContent(input.value);
    input.value = "";
})

window.onload = () => {
    const content = getContent();
    content.forEach(el => {
        renderContent(el);
    });
}

contentList.addEventListener("click", (event) => {
    if(event.target.classList.contains("content__change")) {
        changeContent(event.target);
    }
    if(event.target.classList.contains("content__delete")) {
        removeContent(event.target);
    }
});

confirmBtn.addEventListener("click", () => {
    const allLi =document.querySelectorAll(".content__list");
    allLi.forEach(e => e.remove());

    const content = getContent();
    content.forEach(el => {
        renderContent(el);
    });

    confirmBtn.style.display = "none";
    saveBtn.style.display = "block"
    input.value = "";
})