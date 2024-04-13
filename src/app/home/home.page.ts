import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsumeService } from '../services/consume/consume.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  binding: string = '';
  emailError: string = 'Campo de email no valido';
  passError: string = 'Campo de password no valido';
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private consumeService: ConsumeService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.form = this.fb.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    })
  }

  logCompany() {
    console.log(this.binding);
  }

  logForm() {
    console.log(this.form);
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }
  async openAlert(err: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'No existe tal usuario',
      buttons: [
        { text: 'Ok' },
      ]
    });
    alert.present();
  }
  async openToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3500
    });
    toast.present();
  }

  getUser() {
    this.consumeService.getUser(this.form.controls['email'].value, this.form.controls['password'].value).subscribe({
      next: (resp) => {
        if (resp && resp.length > 0) {
          console.log('Usuario encontrado:', resp);
          this.router.navigate(['productos']);
        } else {
          this.openAlert('Usuario no encontrado');
        }
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }
  

}
