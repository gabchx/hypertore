//Attribut : résultat,operateur actuel,operation actuelle, ope
class Calculateur{

    constructor(stringLigneActuelle,stringLignePrecedente){ 
        this.stringLigneActuelle = stringLigneActuelle
        this.stringLignePrecedente = stringLignePrecedente
        this.Reinitialiser(); //Initialisation
    }
    
    Reinitialiser(){
        this.operationActuelle = ''
        this.operationPrecedente = ''
        this.operateur = undefined
    }

    Supprimer(){
        this.operationActuelle = this.operationActuelle.toString().slice(0, -1)
    }

    EcritureNombre(nombre){
        if(!(nombre === '.' && this.operationActuelle.includes('.'))){
            this.operationActuelle = this.operationActuelle.toString() + nombre.toString()
        }
    }

    TrouverOperation(operateur){
        if(this.operationActuelle!==''){
            if(this.operationPrecedente!==''){
                this.Calcul()
            }
            this.operateur = operateur
            this.operationPrecedente = this.operationActuelle
            this.operationActuelle = ''
        }
    }

    Calcul(){
        let resultat
        const lignePrecedent = parseFloat(this.operationPrecedente)
        const ligneActuelle = parseFloat(this.operationActuelle)
        if (!(isNaN(lignePrecedent) || isNaN(ligneActuelle))){
            switch (this.operateur) {
                case '+':
                    resultat = lignePrecedent + ligneActuelle
                    break
                case '-':
                    resultat = lignePrecedent - ligneActuelle
                    break
                case '*':
                    resultat = lignePrecedent * ligneActuelle
                    break
                case '÷':
                    resultat = lignePrecedent / ligneActuelle
                    break
                default:
                    return
            }
            this.operationActuelle = resultat
            this.operateur = undefined
            this.operationPrecedente = ''
        }
        console.log(resultat)
    }

    Actualiser(){
        this.stringLigneActuelle.innerText = this.operationActuelle
        if(this.operateur != null){
            this.stringLignePrecedente.innerText = this.operationPrecedente.toString() + " " +this.operateur.toString()
        }
        else{
            this.stringLignePrecedente.innerText = ''
        }
    }
}

//Calculette
const boutonsNombres = document.querySelectorAll('[data-nombre]')
const boutonsOperations = document.querySelectorAll('[data-operateur]')
const boutonEgale = document.querySelector('[data-egl]')
const boutonAc = document.querySelector('[data-ac]')
const boutonVrgl = document.querySelector('[data-vrgl]')
const boutonDel = document.querySelector('[data-del]')
const stringLignePrecedente = document.querySelector('[data-operation-precedente]')
const stringLigneActuelle = document.querySelector('[data-operation-actuelle]')
const calculateur = new Calculateur(stringLigneActuelle,stringLignePrecedente)

//mode nuit
document.querySelector('.checkbox').addEventListener('change',()=>{
    document.querySelectorAll('.mode-nuit-disponible').forEach(ele=>{
        ele.classList.toggle('nuit');
    })
})

//notifications
const notyf = new Notyf({
    duration : 3500,
    position : {
        x : 'rigth',
        y : 'top',
    }
});

//entrée clavier
window.addEventListener("keyup", function(event) {
    event.preventDefault();
    console.log(event.key)
    if ((event.key == 1)||(event.key == 2)||(event.key == 3)||(event.key == 4)||
    (event.key == 5)||(event.key == 6)||(event.key == 7)||(event.key == 8)||
    (event.key == 9)||(event.key == 0)||(event.key == "+")||(event.key == "-")||
    (event.key == "*")||(event.key == "/")||(event.key == "=")){
        document.getElementById("b"+event.key).click();
    }
    if (event.key == "Enter"){
        document.getElementById("b=").click();
    }
    if (event.key == "Backspace"){
        document.getElementById("bdel").click();
    }
    if (event.key == "Escape"){
        document.getElementById("bac").click();
    }
    //Ajouter une fonction asychrone??
    if ((event.key=="Control")||(event.key=="Meta")){
        CopierResuletat();
    }
});

boutonsNombres.forEach(bouton => {
    bouton.addEventListener('click', () => {
        calculateur.EcritureNombre(bouton.innerText)
        calculateur.Actualiser()
    })
})

boutonsOperations.forEach(bouton => {
    bouton.addEventListener('click', () => {
        calculateur.TrouverOperation(bouton.innerText)
        calculateur.Actualiser()
    })
})

boutonAc.addEventListener('click', () => {
    console.log('ac')
    calculateur.Reinitialiser()
    calculateur.Actualiser()
})

boutonDel.addEventListener('click', () => {
    console.log('del')
    calculateur.Supprimer()
    calculateur.Actualiser()
})

boutonEgale.addEventListener('click', () => {
    console.log('egl')
    calculateur.Calcul() 
    calculateur.Actualiser()
})

function CopierResuletat(){
    var content = document.getElementById('source-de-copie').innerText
    console.log(content)
    if(content!==''){
        navigator.clipboard.writeText(content)
        notyf.success('Résultats copié !'); //https://github.com/caroso1222/notyf
    }
    else{
        notyf.error('Pas de résultat à copié !');
    }
}
