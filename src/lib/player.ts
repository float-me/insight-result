export let round = 0
const info: [string, number, number][] = [
    ["최준서", 3, 3], ["나경수", 3, 3], ["고종환", 3, 2], ["이태윤", 3, 2], ["구동현", 2, 2], ["이우재", 2, 2], ["김은성", 2, 1], ["강윤재", 2, 1], ["이정엽", 1, 1], ["김윤상", 1, 1], ["이희택", 1, 0],
    ["김솔엽", 1, 0], ["강유빈", 1, 0]
]
let playerLeft = info.length

type Action = {
    text: string,
    detail?: string,
    ganet?: number,
    spinel?: number
}

export class Player {
    name: string
    alive: boolean
    ganet: number[]
    spinel: number[]
    history: Action[]
    constructor(name: string, rank: number, initialGanet: number, initialSpinel: number) {
        this.name = name
        this.alive = true
        this.ganet = [initialGanet]
        this.spinel = [initialSpinel]
        this.history = [{text: "선발전", detail:`${rank}등`, ganet:initialGanet, spinel:initialSpinel}]
    }

    giveGanet(player: Player, ganet: number, action: Action) {
        this.ganet[round] -= ganet
        player.ganet[round] += ganet
        this.history.push( {...action, detail: `${player.name}에게 ${ganet}가넷을 전달했습니다.`, ganet: -ganet})
        player.history.push(
            {...action, detail: `${this.name}에게서 ${ganet}가넷을 받았습니다.`, ganet: ganet})
    }

    getGanet(ganet: number, action: Action) {
        this.ganet[round] += ganet
        this.history.push({...action, detail:`${ganet}가넷을 받았습니다.`, ganet:ganet})
    }

    useGanet(ganet: number, action: Action) {
        this.ganet[round] -= ganet
        this.history.push({...action, detail:`${ganet}가넷을 사용했습니다.`, ganet:-ganet})
    }

    giveSpinel(player: Player, spinel: number, action: Action) {
        this.spinel[round] -= spinel
        player.spinel[round] += spinel
        this.history.push( {...action, detail: `${player.name}에게 ${spinel}스피넬을 전달했습니다.`, spinel: -spinel})
        player.history.push(
            {...action, detail: `${this.name}에게서 ${spinel}스피넬을 받았습니다.`, spinel: spinel})
    }

    getSpinel(spinel: number, action: Action) {
        this.spinel[round] += spinel
        this.history.push({...action, detail:`${spinel}스피넬을 받았습니다.`, spinel:spinel})
    }

    useSpinel(spinel: number, action: Action) {
        this.spinel[round] -= spinel
        this.history.push({...action, detail:`${spinel}스피넬을 사용했습니다.`, spinel:-spinel})
    }

    changeRound(action: Action) {
        this.ganet.push(this.ganet[round])
        this.spinel.push(this.spinel[round])
        this.history.push(action)
    }

    die(action: Action) {
        this.alive = false
        this.history.push({...action, detail:`탈락했습니다. (최종 ${playerLeft}위)`})
        playerLeft -= 1
    }

    deathMatch(player: Player) {
        this.addAction({text: "데스매치 진출", detail: "탈락 후보"})
        this.addAction({text: `데스매치 상대로 ${player.name}을 지목했습니다.`})
        player.addAction({text: "데스매치 진출", detail: `${this.name}에게 지목됨`})
    }

    deathMatchWinAgainst(player: Player, ganet: number, spinel: number) {
        player.die({text: `${round}회전 데스매치 패배`})
        let win = {text: `${round}회전 데스매치 승리`}
        this.getGanet(ganet, win)
        this.getSpinel(spinel, win)
    }

    addAction(action: Action) {
        this.history.push(action)
    }
}

export let players: {[name: string]: Player} = {}
export let names: string[] = []
for (let i = 0; i < info.length; i++) {
    const element = info[i];
    players[element[0]] = new Player(element[0], i+1, element[1], element[2])
    names.push(element[0])
}

function changeRound() {
    let action = {text: `${round + 1}회전이 시작되었습니다.`}
    for (const name in players) {
        if (Object.prototype.hasOwnProperty.call(players, name)) {
            const player = players[name];
            if (player.alive) {
                player.changeRound(action)
            }
        }
    }
    round += 1
}

// HISTORY OF INS!GHT
changeRound()

// 1회전
players["고종환"].getSpinel(1, {text: "이론치 달성"})
players["고종환"].getSpinel(1, {text: "메인매치 우승"})

players["고종환"].getGanet(4, {text: "(이유)"})
players["나경수"].getGanet(2, {text: "(이유)"})
players["이태윤"].getGanet(2, {text: "(이유)"})
players["이정엽"].useGanet(1, {text: "(이유)"})
players["김윤상"].useGanet(1, {text: "(이유)"})
players["이희택"].useGanet(1, {text: "(이유)"})

players["이정엽"].deathMatch(players["이희택"])
players["이정엽"].deathMatchWinAgainst(players["이희택"], 2, 2)
changeRound()

//2회전
players["고종환"].getSpinel(5, {text: "양수 승점"})
players["고종환"].getSpinel(1, {text: "3점 이상"})
players["이태윤"].getSpinel(3, {text: "양수 승점"})
players["이태윤"].getSpinel(1, {text: "3점 이상"})
players["이정엽"].getSpinel(3, {text: "양수 승점"})
players["이태윤"].getSpinel(1, {text: "3점 이상"})
players["구동현"].getSpinel(3, {text: "양수 승점"})
players["구동현"].getSpinel(1, {text: "3점 이상"})
players["김은성"].getSpinel(5, {text: "양수 승점"})
players["김은성"].getSpinel(1, {text: "3점 이상"})
players["최준서"].getSpinel(3, {text: "양수 승점"})
players["최준서"].getSpinel(1, {text: "3점 이상"})
players["김솔엽"].getSpinel(1, {text: "양수 승점"})

players["김윤상"].getSpinel(1, {text: "우승자 지목"})
players["김윤상"].getSpinel(1, {text: "우승자 지목"})

let useChange = ["고종환", "이태윤", "이정엽", "구동현", "김은성", "김솔엽"]
for (const idx in useChange) {
    let name = useChange[idx]
    players[name].useSpinel(1, {text: "특수 교환권 사용"})
}

players["김윤상"].deathMatch(players["이우재"])
players["김윤상"].deathMatchWinAgainst(players["이우재"], 2, 3)
changeRound()

//3회전
let winners = ["김솔엽", "이태윤", "나경수", "고종환"]
for (const idx in winners) {
    let name = winners[idx]
    players[name].getSpinel(6, {text: "메인매치 우승"})
}
let didGood = [...winners, "이정엽", "김은성", "최준서"]
for (const idx in didGood) {
    let name = didGood[idx]
    players[name].getSpinel(1, {text: "메인매치 1~7위"})
}

for (const idx in players) {
    if (Object.prototype.hasOwnProperty.call(players, idx)) {
        const player = players[idx];
        if (player.alive && !["고종환", "나경수", "김솔엽"].includes(player.name)) {
            player.addAction({text:"스피넬 매치에 참여했습니다."})
        }
    }
}
players["김은성"].useSpinel(4, {text: "스피넬 매치 힌트 사용"})
players["김윤상"].useSpinel(1, {text: "스피넬 매치 힌트 사용"})
players["이태윤"].useSpinel(1, {text: "스피넬 매치 힌트 사용"})
players["최준서"].useSpinel(5, {text: "스피넬 매치 힌트 사용"})

let escaped = ["구동현", "이태윤", "김은성", "이정엽"]
for (const idx in escaped) {
    if (Object.prototype.hasOwnProperty.call(escaped, idx)) {
        const name = escaped[idx];
        players[name].getSpinel(3, {text: "스피넬 매치 탈출"})
    }
}

players["강유빈"].die({text: "스피넬 매치 탈락"})
players["강윤재"].die({text: "스피넬 매치 탈락"})
players["최준서"].die({text: "스피넬 매치 탈락"})
changeRound()