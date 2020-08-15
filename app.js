// init speech synth api
const synth = window.speechSynthesis;
// dom elements

const textForm = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')
const rateValue = document.querySelector('#rate-value')
const rate = document.querySelector('#rate')
const pitchValue = document.querySelector('#pitch-value')
const pitch = document.querySelector('#pitch')
const body = document.querySelector('body')


//init voices array

let voices = []
const getVoices = () => {
  voices = synth.getVoices()
  //loop thru these voices
  voices.forEach(voice => {
    //create pbject element
    const option = document.createElement('option')
    option.textContent = voice.name + '(' + voice.lang + ')'
    //set option attributes
    option.setAttribute('data-lang', voice.lang)
    option.setAttribute('data-name', voice.name)
    voiceSelect.appendChild(option)


  })
}
getVoices()


if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {

  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  if (textInput.value !== '') {
    //add background animation
    body.style.background = 'black url(img/wave1.gif)';
    body.style.backgroundRepeat = 'repeat-x'
    body.style.backgroundSize = '100% 100%'


    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speak end
    speakText.onend = e => {

      body.style.background = '#0A3D62';
      console.log('Done speaking...');
    };

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};

// Event Listeners

// text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault()
  speak()
  textInput.blur()

})

// rate value change
rate.addEventListener('change', e => {
  rateValue.textContent = rate.value
})
pitch.addEventListener('change', e => {
  pitchValue.textContent = pitch.value
})
// voice select change
voiceSelect.addEventListener('change', e => speak())