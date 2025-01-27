document.addEventListener('DOMContentLoaded', () => {
    const pagination = document.querySelectorAll('.pagination')
    const previousBtn = document.querySelector('#previous-btn')
    const nextBtn = document.querySelector('#next-btn')
    const progressBar = document.querySelector('#progress')
    const resultTab = document.querySelector('#results-content')
    const answers = ["serveur", "oslo", "dollar", "let", "client", "modele", "print", "select", "vrai", "oslo"]

    let currentIndex = 0
    const questions = pagination.length - 1

    let correct = 0
    let incorrect = 0


    
    const updateTab = (index) => {
        pagination[currentIndex].classList.remove('active')
        document.querySelector(`${pagination[currentIndex].getAttribute('data-bs-target')}`).classList.remove('show','active')
        
        currentIndex = index

        pagination[currentIndex].classList.add('active')
        document.querySelector(`${pagination[currentIndex].getAttribute('data-bs-target')}`).classList.add('show', 'active')
        

        const progress = Math.floor((currentIndex / questions) * 100)
        progressBar.style.width = `${progress}%`
        progressBar.textContent = `${progress}%`

        previousBtn.disabled = currentIndex === 0
    }


    previousBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            updateTab(currentIndex - 1)
        } 
    })

    nextBtn.addEventListener('click', () => {
        
        if (currentIndex < questions) {
            updateTab(currentIndex + 1)

        } 
    })

    nextBtn.addEventListener('click', () => {
        if (currentIndex === 10 ) {
            const form = document.querySelectorAll('form')
            let x = 0

            correct = 0
            incorrect = 0

            form.forEach((form) => {
                const selectedBtn = form.querySelector('.form-check-input:checked')
                if (selectedBtn.value === answers[x]) {
                    correct++
                    localStorage.setItem(`answer${x}`, true)
                } else  {
                    incorrect++
                    localStorage.setItem(`answer${x}`, false)
                }
                x++
             })
        }
    })

nextBtn.addEventListener('click', () => {
    if (currentIndex === 10) {
        const chart = document.querySelector('#my-chart').getContext('2d')
        new Chart(chart, {
            type: 'doughnut',
            data: {
                labels: ['Vrai', 'Faux'],
                datasets: [{
                    label: '# de bonne réponses',
                    data: [correct, incorrect],
                    borderWidth: 1
                }]
            },
        })
    }
})

    updateTab(currentIndex)


    for(let y = 0; y < 10; y++)
    {localStorage.removeItem(`answer${y}`)}

})