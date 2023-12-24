(function () {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
})();

// !CRUD
var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var URLList = [];

// Check if there are saved products in local storage
if (localStorage.getItem("URLList") !== null) {
  URLList = JSON.parse(localStorage.getItem("URLList"));
  displayData();
}

function addURL() {
  var form = document.querySelector('.needs-validation');

  if (form.checkValidity()) {
    var product = {
      name: nameInput.value,
      url: urlInput.value,
    };

    URLList.push(product);
    displayData();
    localStorage.setItem("URLList", JSON.stringify(URLList));
    form.classList.remove('was-validated');
  } else {
    console.log("Form is not valid. Please check your input.");
  }
}


function displayData() {
  var temp = '';

  for (var i = 0; i < URLList.length; i++) {
    temp += `<tr>
        <td>${URLList[i].name}</td>
        <td><a href="${URLList[i].url}" target="_blank">GO TO WebSite</a></td>
        <td><i style="color:red; cursor: pointer;" class="fa-solid fa-trash-can" onclick="deleteURL(${i})"></i></td>

        </tr>`;
  }


  document.getElementById("data").innerHTML = temp
}

function deleteURL(index) {
  // Display a SweetAlert confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    // If the user clicks "Yes", delete the URL
    if (result.isConfirmed) {
      URLList.splice(index, 1);
      displayData();
      localStorage.setItem("URLList", JSON.stringify(URLList));
      
      // Display a success message
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
  });
}



