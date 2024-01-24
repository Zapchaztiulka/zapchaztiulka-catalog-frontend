//function who make format number phone with gaps(097 123 45 67)
export const formatPhoneNumber = (input) => {
   let cleaned = ('' + input).replace(/\D/g, '');
    let formattedNumber = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 3 || i === 6 || i === 8) {
        formattedNumber += ' ';
      }
      formattedNumber += cleaned[i];
    }
    return formattedNumber;
}

export const displayError = (message) => {
    errorMessage.textContent = message;
}

 //function who make change format number phone in input field
export  const replacePhoneNumber = async () => {
    let phoneNumberInput = document.getElementById('phone');
    phoneNumberInput.addEventListener('input', function (event) {
      let inputPhoneNumber = event.target.value;
      phoneNumberInput.value = formatPhoneNumber(inputPhoneNumber);

      if (event.target.value[0] !== '0') {
        phoneNumberInput.value = inputPhoneNumber.slice(0, 1);
        displayError('Номер телефону має починатись з "0"');
      } else displayError('');
      if (inputPhoneNumber.length > 13) {
        let trimmedPhoneNumber = inputPhoneNumber.slice(0, 13);
        phoneNumberInput.value = trimmedPhoneNumber;
      }
    });
  };

