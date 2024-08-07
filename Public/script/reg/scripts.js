//form cập nhật thông tin
function getCSRFToken() {
    const csrfCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('csrfToken='));
    if (csrfCookie) {
        return csrfCookie.split('=')[1];
    }
    return '';
}
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        registerUser();
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        loginUser();
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    function checkAccountType() {
        var tutorRadio = document.getElementById("tutor");
        var studentRadio = document.getElementById("student");

        if (tutorRadio.checked || studentRadio.checked) {
            console.log('ch');
        } else {
            alert("Bạn phải chọn loại tài khoản.");
        }
    }

    function registerUser() {
        const usrname = document.getElementById('usrname_reg').value;
        const email = document.getElementById('email_reg').value;
        const password = document.getElementById('pass_reg').value;
        const accountType = document.querySelector('input[name="accountType"]:checked').value;
        const role = (accountType === 'tutor') ? 1 : 0;
    
        const data = {
            usrname: usrname,
            email: email,
            password: password,
            role: role
        };
    
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            const responseData = await response.json();
            if (!response.ok) {
                // Quăng lỗi với thông điệp từ API
                throw new Error(responseData.message || 'Network response was not ok');
            }
            return responseData;
        })
        .then(data => {
            console.log(data);
            if (data.code !== '200') {
                alert(data.message);
                document.getElementById('usrname_reg').value = '';
                document.getElementById('email_reg').value = '';
                document.getElementById('pass_reg').value = '';
            } else {
                alert(data.message);
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Đăng kí thất bại: " + error.message);
        });
    }
    

    function loginUser() {
        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;
        
        const loginData = {
            email: loginEmail,
            password: loginPassword
        };
    
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(async response => {
            const responseData = await response.json();
            if (!response.ok) {
                // Quăng lỗi với thông điệp từ API
                throw new Error(responseData.message || 'Network response was not ok');
            }
            return responseData;
        })
        .then(result => {
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
            alert("Đăng nhập thành công !!!");
            window.location.replace('./index.html');
        })
        .catch(error => {
            alert("Đăng nhập thất bại: " + error.message);
            console.error('Error:', error);
        });
    }
    

    document.getElementById('registerButton').addEventListener('click', registerUser);
    document.getElementById('loginButton').addEventListener('click', loginUser);
});






/*

document.getElementById('registerButton').addEventListener('click', function () {
  // Lấy giá trị từ các trường input
  const usrname = document.getElementById('usrname_reg').value;
  const email = document.getElementById('email_reg').value;
  const password = document.getElementById('pass_reg').value;
  const accountType = document.querySelector('input[name="accountType"]:checked').value;

// Chuyển đổi giá trị của accountType thành số nguyên
const role = (accountType === 'tutor') ? 1 : 0;

// Tạo đối tượng dữ liệu để gửi đến server
const data = {
    usrname: usrname,
    email: email,
    password: password,
    role: role 
};
  // Gửi yêu cầu POST đến server
  fetch('http://localhost:3000/api/register', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
console.log(result);

if (result.error) {
    // Nếu có lỗi từ server, hiển thị thông báo lỗi và xóa giá trị trên form
    alert(result.error);
    console.error(result.error);  // Log lỗi để kiểm tra
    document.getElementById('usrname_reg').value = '';
    document.getElementById('email_reg').value = '';
    document.getElementById('pass_reg').value = '';
} else {
    // Nếu không có lỗi, hiển thị thông báo thành công và thực hiện các hành động khác (nếu cần)
    alert(result.message);
    window.location.reload();
    //window.location.href ='./index.html'
}
})
.catch(error => {
console.error('Error:', error);
});
  
});

//login
document.getElementById('loginButton').addEventListener('click', function () {
// Lấy giá trị từ các trường input
const loginEmail = document.getElementById('loginEmail').value;
const loginPassword = document.getElementById('loginPassword').value;



// Tạo đối tượng dữ liệu để gửi đến server
const loginData = {
    email: loginEmail,
    password: loginPassword
};

// Gửi yêu cầu POST đến server
fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
})
.then(response => response.json())
.then(result => {
    console.log(result);

    if (result.error) {
        // Nếu có lỗi từ server, hiển thị thông báo lỗi và xóa giá trị trên form
        alert(result.error);
        console.error(result.error);  // Log lỗi để kiểm tra
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        // Nếu không có lỗi, hiển thị thông báo thành công và thực hiện các hành động khác (nếu cần)
        alert(result.message);
        window.location.replace('./index.html');

        
          // Chuyển hướng đến trang index.html
    }
})
.catch(error => {
    console.error('Error:', error);
});
});

*/







