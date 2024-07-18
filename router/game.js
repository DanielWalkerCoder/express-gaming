const express = require('express')
const router = express.Router()
const uuidv4 = require('uuid').v4

let games = [
    {
        id: "adowb1b3bb",
        game: "League of Legends",
        description: "League of Legends is a team-based game with over 140 champions to make epic plays with."
    },
    {
        id: "kd7b9ks2nda",
        game: "PlayerUnknown's Battlegrounds",
        description: "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback."
    }
    ]

router.get('/get-all-games', (req, res)=>{
    res.json({payload: games})
})

router.get('/get-game-by-id/:id', (req, res)=>{
    let foundGame = games.find(game => game.id === req.params.id)
    if(foundGame){
        res.json({payload: foundGame})
    }else{
        res.json({message: "The game with the id does not exist, please check id"})
    }
})

router.get('/get-game-by-name/:name', (req, res)=>{
    let foundGame = games.find(game => game.game === req.params.name)
    if(foundGame){
        res.json({payload: foundGame})
    }else{
        res.json({message: "The game does not exist, please check name"})
    }
})

router.post('/create-new-game', (req, res)=>{
    let foundGame = games.find(game => game.game === req.body.game)
    if(foundGame){
        res.json({message: "Game already exists, cannot add game"})
    }else
    if(req.body.game === undefined || req.body.game === '' || req.body.description === undefined || req.body.description === ''){
        res.json({message: "cannot leave text area blank"})
    }else{
        let newGame = {
            id: uuidv4(),
            game: req.body.game,
            description: req.body.description
        }
        games.push(newGame)
        res.json({payload: games})
    }
})

router.put('/update-game/:id', (req, res)=>{
    let foundGame = games.find(game => game.id === req.params.id)
    if(!foundGame){
        res.json({message: "game not found, cannot update"})
    }else{
        let changes = 0
        if(req.body.game && req.body.game !== ''){
            foundGame.game = req.body.game
            changes ++
        }
        if(req.body.description && req.body.description !== ''){
            foundGame.description = req.body.description
            changes ++
        }
        if(changes > 0){
            res.json({message: "Game updated", payload: games})
        }else{
            res.json({message: "No changes were made. Make sure the body of your request contains a non-empty game or description value."})
        }
    }
})

router.delete('/delete-game/:id', (req, res)=>{
    let foundGame = games.find(game => game.id === req.params.id)
    if(foundGame){
        let place = games.indexOf(foundGame)
        games.splice(place, 1)
        res.json({message: "Game deleted.", payload: games})
    }else{
        res.json({message: "game not found, cannot delete"})
    }
})

module.exports = router