$('#scrape-button').on('click', event => {
    console.log('test')
    event.preventDefault()
    $.get('/api/scrape').then(data => {
        console.log('Scraping...')
    })
})