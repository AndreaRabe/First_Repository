'use strict'
// Pour stocker les informations
class ArrayStorage {
    // Un constructeur pour initialiser l'objet avec le nom de la clé et son valeur
    constructor(name){
        this.name = name
        this.list = this.get()
    }

    // Une méthode pour récuperer un tableau des valeurs ou par défaut, le creera 
    get(){
        if(!localStorage.getItem(this.name))
        {
            localStorage.setItem(this.name, '[]')
        }
        return JSON.parse(localStorage.getItem(this.name))
    }

    // Une méthode pour ajouter une valeur dans le tableau
    set(value){
        this.list.push(value)
        localStorage.setItem(this.name, JSON.stringify(this.list))
    }

    // Une méthoe pour supprimer une valeur du tableau
    remove(value){
        const index = this.list.indexOf(value)
        this.list.splice(index, 1)  // afaka mamafa maromaro
        localStorage.setItem(this.name, JSON.stringify(this.list))
    }

    // Une méthode pour vider tout le tableau
    clear(){
        localStorage.removeItem(this.name)
    }
}