import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = false;
  // loginObj:Login;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    // this.loginObj = new Login();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  // onLogin(): void {
  //   if (this.loginForm.valid) {
  //     const { email, password } = this.loginForm.value;
  //     this.dataService.login(email, password).subscribe(
  //       (response) => {
  //         localStorage.setItem('token', response.token); // เก็บ token ใน localStorage
  //         this.isLoggedIn = true; // ตั้งค่าเป็นล็อกอินแล้ว
  //         // alert('เข้าสู่ระบบสำเร็จ');
  //         this.router.navigate(['/dashboard']); // นำทางไปยังหน้า Home หรือหน้าที่ต้องการ
  //       },
  //       (error) => {
  //         alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  //       }
  //     );
  //   }
  // }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.dataService.login(email, password).subscribe(
        (response) => {
          const token = response.token;
          const role = response.role;
          if (token && role) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            this.isLoggedIn = true;
      
            // กำหนดเส้นทางตาม role
            if (role === 'admin') {
              this.router.navigate(['/event']);
            } else if (role === 'member') {
              this.router.navigate(['/home']);
            }
          }
        },
        (error) => {
          alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
      );
      
    }
  }
  

  
  

  // onLogin(){
  //   console.log('form data:', this.loginForm)
  //   this.http.post('https://wag10.bowlab.net/api/login', this.loginForm.value).subscribe((res:any) =>{
  //     console.log(res);
  //     if(res.result){
  //       alert("Login Success");
  //       this.router.navigateByUrl('/dashboard')
  //     }else{
  //       alert(res.message)
  //     }
  //   })
  // }

  

//   onLogin() {
//     if (this.loginForm.invalid) {
//         const { email, password} = this.loginForm.value

//     }

//     console.log('Form Data:', this.loginForm.value);
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     this.http.post('https://wag10.bowlab.net/api/login', this.loginForm.value, { headers }).subscribe(
//       (res: any) => {
//         console.log("API Response:", res);
//         if (res && res.result) {
//           alert("Login Success");
//           this.router.navigateByUrl('/dashboard');
//         } else {
//           alert(res.message || "Login failed. Please check your credentials.");
//         }
//       },
//       (error) => {
//         console.error("API Error:", error);
//         alert("Login failed. Please try again later.");
//       }
//     );
// }

  // onLogin(){
  //   debugger;
  //   this.http.post('https://wag10.bowlab.net/api/login', this.loginObj).subscribe((res:any) =>{
  //     if(res.result){
  //       alert('login Success')
  //     }else{
  //       alert(res.message)
  //     }
  //   })
  // }


  goToRegister() {
    this.router.navigate(['/register']);
  }

  forgotPasswordAction(): void {
    // ฟังก์ชันสำหรับลืมรหัสผ่าน
  }
}


// export class Login{
//   EmailId: string;
//   Password: string;
//   constructor(){
//     this.EmailId = '';
//     this.Password = '';
//   }
// }
