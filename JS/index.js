'use strict'
//DOM selection
const list = document.getElementById('list')
const input = document.getElementById('input')
const add = document.getElementById('add')
const clear = document.getElementById('clear')
const url = document.getElementById('url')
const load = document.getElementById('load')


// Nouvelle instance pour la clé 'tasks'
const storage = new ArrayStorage('tasks')

//On récupère le tableau des tâches déjà existantes ou bien un tableau vide
const tasks = storage.list

function taskToDom(task){
    if (typeof task === 'string' && task){
        const li = document.createElement('li')
        const remove = document.createElement('button')
        
        li.textContent = task
        remove.textContent = 'REMOVE'

        remove.addEventListener('click', () =>{
            const value = remove.parentNode.firstChild.textContent
            storage.remove(value)
            list.removeChild(remove.parentNode)
        })
    
        li.appendChild(remove)
        list.insertBefore(li, list.firstChild)

        return true
    }
    return false
}

// ON ajoute chaque tâche à la liste à puces
/*for(let i = 0 ; i < tasks.length ; i++)
{
    taskToDom(tasks[i])

}*/
tasks.forEach(taka => taskToDom(taka))

// ON gère l'ajout d'autre tache
function newTask(){
    if(storage.list.indexOf(input.value) === -1 && taskToDom(input.value))
    {
        storage.set(input.value)
        input.value = ''
    }
    input.focus()
}

// on ajoute de nouveau tache
add.addEventListener('click', newTask)
input.addEventListener('keydown', e =>{
    if (e.key == 'Enter'){
        newTask()
    }
})

// on gère la suppression de toutes les tache du DOM
clear.addEventListener('click', () => {
    storage.clear()
    list.innerHTML = ''
})

//  on gère l'importation de fichier format Json
load.addEventListener('click', () => {
    fetch(url.value)
    .then(res => {
        if(res.ok){
            return res.json()
        }
        throw new Error(`${res.statusText} (${res.status})`)
    })
    .then(tasks => {
        if(Array.isArray(tasks)){
            tasks.forEach(task => {
                if(storage.list.indexOf(task) === -1 && taskToDom(task))
                {
                    storage.set(task)
                }
            })
            return
        }
        //throw new TypeError(`Erreur sur type : ${typeof() }`)
    })
})