export const enhance = (form: HTMLFormElement, {
    result
  }) => {
    // console.log(`** result **: `, result)

    const handleSubmit = async (event: Event) => {

        // console.log(`** event **: `, event)
        console.log(`** form **: `, form)

      event.preventDefault();
  
      try {
        console.log(`FORM = `, form)
        const body = new FormData(form);
        console.log(`BODY = `, body)

        const res = await fetch(form.action, {
          method: form.method,
          headers: {
            accept: "application/json"
          },
          body
        });

        console.log(`res: `, res)
        console.log(`res.ok: `, res.ok)
  
        if (res.ok) {
          result(res, form);
        } else {
          console.error("Fetch error: ", await res.text());
        }
      } catch (error) {
        console.error("Could not submit the form: ", error);
      }
    };
  
    form.addEventListener("submit", handleSubmit);
  
    return {
      destroy() {
        form.removeEventListener("submit", handleSubmit);
      }
    }
  };