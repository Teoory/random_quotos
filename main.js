
        // JSON dosyasından alıntıları okuma
        fetch('quotes.json')
            .then(response => response.json())
            .then(data => {
                const quotes = data.quotes;

                // Alıntıları gösterme fonksiyonu
                function showQuotes() {
                    const count = parseInt(document.getElementById('quoteCount').value);
                    const quoteContainer = document.getElementById('quotes');
                    quoteContainer.innerHTML = '';

                    const uniqueQuotes = getRandomUniqueQuotes(count, quotes);

                    uniqueQuotes.forEach(quote => {
                        const quoteElement = document.createElement('div');
                        quoteElement.classList.add('quote');

                        const quoteTextElement = document.createElement('p');
                        quoteTextElement.textContent = quote.quote;
                        quoteElement.appendChild(quoteTextElement);

                        const authorElement = document.createElement('p');
                        authorElement.id= "authorElement";
                        authorElement.textContent = `- ${quote.author}`;
                        quoteElement.appendChild(authorElement);

                        quoteContainer.appendChild(quoteElement);
                    });
                }

                // Belirtilen sayıda farklı alıntıları rastgele seçme fonksiyonu
                function getRandomUniqueQuotes(count, quotes) {
                    const uniqueQuotes = [];
                    const quoteIndices = new Set();

                    while (quoteIndices.size < count) {
                        const randomIndex = Math.floor(Math.random() * quotes.length);

                        if (!quoteIndices.has(randomIndex)) {
                            quoteIndices.add(randomIndex);
                            uniqueQuotes.push(quotes[randomIndex]);
                        }
                    }

                    return uniqueQuotes;
                }

                // Sayfa yüklendiğinde rastgele bir alıntı göster
                showQuotes();

                // Butona tıklandığında alıntıları göster
                document.getElementById('nextButton').addEventListener('click', showQuotes);
            })
            .catch(error => {
                console.error('Alıntılar yüklenirken bir hata oluştu:', error);
            });