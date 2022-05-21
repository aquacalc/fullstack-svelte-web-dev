export const enhance = (form: HTMLFormElement) => {
    console.log(`Evo me u $lib/actions/form.ts enhance!`)
    console.log(`form = `, form)

    const handleSubmit = async (e: Event) => {

        e.preventDefault();

        console.log(`form.action: ${form.action}`)
        console.log(`form.method: ${form.method}`)

        try {
            const body = new FormData(form);

            console.log(`typeof body: `, typeof body)

            // const res = await fetch(form.action, {
            //     method: form.method,
            //     headers: {
            //         'accept': 'application/json'
            //     },
            //     body
            // })

            // see: https://support.stripe.com/questions/how-to-fix-syntaxerror-unexpected-token-in-json-at-position-0
            let responseClone; // 1

            fetch(form.action, {
                method: form.method,
                headers: {
                    'accept': 'application/json'
                },
                body
            })
                .then(function (response) {
                    responseClone = response.clone(); // 2
                    return response.json();
                })
                .then(function (data) {
                    // Do something with data
                }, function (rejectionReason) { // 3
                    console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
                    responseClone.text() // 5
                    .then(function (bodyText) {
                        console.log('Received the following instead of valid JSON:', bodyText); // 6
                    });
                });

            console.log('res.json() ', await res.json());

            if(res.ok) {
                console.log(`---- `)
                // console.log(`res.json(): `, await res.json())
            } else {
                console.log(`Fetch error: `, await res.text())
            }

        } catch (error) {
            console.log(`Could not submit form...`, error)
        }
    }

    form.addEventListener('submit', handleSubmit)

    return {
        destroy() {
            console.log(`Destroy enhance action...`)
        }
    }
}