const multiStepFrom = document.querySelector("[data-multi-step]")
const fromSteps = [...multiStepFrom.querySelectorAll("[data-step]")]
let currentStep = fromSteps.findIndex(step => {
        return step.classList.contains("active")
    })

if (currentStep < 0) {
    currentStep = 0
    showCurrentStep()
}

multiStepFrom.addEventListener("click", e => {
    let incrementor
    if (e.target.matches("[data-next]")) {
        incrementor = 1
    } else if (e.target.matches("[data-previous]")) {
        incrementor = -1
    } 

    if (incrementor == null) return

    const inputs = [...fromSteps[currentStep].querySelectorAll("input")]
    const allValid = inputs.every(input => input.reportValidity())
    if (allValid) {
        currentStep += incrementor
        showCurrentStep()
    }
})

fromSteps.forEach(step => {
    step.addEventListener("animationend", e => {
        fromSteps[currentStep].classList.remove("hide")
        e.target.classList.toggle("hide", !step.classList.contains("active"))
    })
})

function showCurrentStep() {
    fromSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep)
    })
}