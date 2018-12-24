document.addEventListener('DOMContentLoaded', appStart);

const sounds = {
    113: "boom",
    119: "clap",
    101: "hihat",
    114: "kick",
    116: "openhat",
    121: "ride",
    117: "snare",
    105: "tink",
    111: "tom"
}

function appStart(){
    window.addEventListener('keypress', playSound)
    document.querySelector('#rec').addEventListener('click', recAudio)
    document.querySelector('#play').addEventListener('click', playAudio)
}

const channel1 = []
let isRecording = false
let recStartTime = 0

function recAudio(e){
    isRecording = !isRecording
    recStartTime = Date.now()
    e.target.innerHTML = isRecording ? 'Zatrzymaj' : 'Nagrywaj'
}

function playAudio(){
    channel1.forEach(sound => {
        setTimeout(
            () => {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
            }, sound.time
        )
    })
}

function playSound(e){
    //e.charCode
    
    if(!sounds[e.charCode]){
        return
    }

    const soundName = sounds[e.charCode]
    const audioDOM = document.querySelector(`#${soundName}`)
    audioDOM.currentTime = 0
    audioDOM.play()
    
    if(isRecording){
        channel1.push(
            {
                name: soundName,
                time: Date.now() - recStartTime
            }
        )
    }
    
}

//uzytkowanie na telefonie, nagrywanie 4 kanałow, przyciski dorobić divy jakieś