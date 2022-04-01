
let game = {

    lockMode: false,
    firtCard: null,
    secondCard: null,

    techs: ['bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],
    

    cards: null,
    
    setCard: function(id){
        let card = this.cards.filter(card=>card.id===id)[0]
        if (card.flipped || this.lockMode){
            return false
        }

        if(!this.firtCard){
            this.firtCard = card
            this.firtCard.flipped = true
            return true
        }else{
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },
    checkMatch: function(){
        if(!this.firtCard || !this.secondCard){
            return false
        }
        return this.firtCard.icon === this.secondCard.icon       
    },

    clearCards: function(){
        this.firtCard = null
        this.secondCard = null
        this.lockMode = false
    },
    unflipCards(){
        this.firtCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },
    checkGameOver(){

      return this.cards.filter(card=>!card.flipped).length == 0
    },


    //cria as cards
   createCardsFromTechs: function (){
        this.cards = []
        this.techs.forEach((tech)=>{
            this.cards.push(this.createPairFromTechs(tech))
        })
       this.cards = this.cards.flatMap(pair=>pair)
       this.shuffleCards()
       return this.cards
    },

    //cria o par de cada tech
    createPairFromTechs: function (tech){
        return [{
            id: this.createIdWithTech(tech),
            flipped: false,
            icon: tech
        },{id: this.createIdWithTech(tech),
            flipped: false,
            icon: tech}]
    },

    //cria um ID para cada tech
    createIdWithTech: function (tech){
        return tech + parseInt(Math.random()*1000)
    },

    //mistura as cards
   shuffleCards: function(cards){
    let currentIndex = this.cards.length
    let randomIndex = 0

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [this.cards[randomIndex], this.cards[currentIndex]] =[this.cards[currentIndex], this.cards[randomIndex]]
    }
},
    flipCard: function(cardId, gameOverCallBack, noMatchCallBack){
        if (this.setCard(cardId)) {
              
            if (this.secondCard) {
              
               if (this.checkMatch()) {
                this.clearCards();
                if(this.checkGameOver()){
                    gameOverCallBack()
                }
              } else {
                setTimeout(() => {
                  //noMach
                  this.unflipCards();
                  noMatchCallBack()
                }, 1000);
              }
            }
          }
    }

}

export default game

