document.addEventListener("DOMContentLoaded", e => {
  const $doc = (selector) => document.querySelector(`${selector}`)

  const lettersUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  const lettersLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const characters = ['!', '@', '#', '$', '%', '^', '&', '*']

  let time = 10
  let timerBar = 100;
  setInterval(() => {
    time--;
    $doc(".timerdown").style.width = `${(timerBar -= timerBar / time)}%`;
    if (time <= 0) {
      $doc(".timerdown").style.width = "100%";
      time = 10
      timerBar = 100
    }
  }, 1000);

  setInterval(() => {
    generatePassword()
  }, 10000);


  const generatePassword = () => {

    let paramsToGenerate = []
    if ($doc("#lettersupper").checked)
      paramsToGenerate.push(lettersUpper)
    if ($doc("#letterslower").checked)
      paramsToGenerate.push(lettersLower)
    if ($doc("#numbers").checked)
      paramsToGenerate.push(numbers)
    if ($doc("#characters").checked)
      paramsToGenerate.push(characters)

    let passwordString = ""

    const passwordLenght = $doc("#rageninp").value

    for (let i = 0; i < passwordLenght; i++) {
      // Rango de acuerdo al lenght del paramsToGenerate
      const randSelector = Math.ceil(Math.random() * paramsToGenerate.length - 1)

      // Seleccionar un index del paramsToGenerate
      const selectedParam = paramsToGenerate[randSelector]

      // Seleccionar un index del array obtenido anteriormente selectedParam
      const randSelector2 = Math.ceil(Math.random() * selectedParam.length - 1)

      // Seleccion un index del array con el randnumer obtenido anteriormente randSelector2
      const selectedParam2 = selectedParam[randSelector2]

      passwordString += `${selectedParam2}`
    }


    $doc("#passwordinp").value = passwordString

  }

  generatePassword()


  document.addEventListener("click", e => {
    const { target } = e

    if (target.closest("#refresh")) {
      generatePassword()
    }

    if (target.closest("#copy")) {
      navigator.clipboard.writeText($doc("#passwordinp").value)
      target.closest("#copy").classList.add("copied")
      setInterval(() => {
        target.closest("#copy").classList.remove("copied")
      }, 500);
    }
  })
  document.addEventListener("input", e => {
    const { target } = e

    if (target.matches("#rageninp")) {
      $doc("#logitudspan").innerText = target.value
      generatePassword()
    }

    if (target.type == "checkbox") {
      generatePassword()
    }
  })

})