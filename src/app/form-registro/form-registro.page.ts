import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsumeService } from '../services/consume/consume.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.page.html',
  styleUrls: ['./form-registro.page.scss'],
})
export class FormRegistroPage implements OnInit {
  form: FormGroup
  binding: string = '';
  emailError: string = 'Campo de email no valido';
  passError: string = 'Campo de password no valido';
  constructor(private fb: FormBuilder, private router: Router, private consumeService: ConsumeService, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.form = this.fb.group({
      nombre: [],
      apellido: [],
      direccion: [],
      telefono: [],
      email: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      genero: [],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    })
  }

  ngOnInit() {
  }

  async openAlert(err: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'A ocurrido un error inesperado: ' + err.status,
      buttons: [
        { text: 'Ok' },
      ]
    });
    alert.present();
  }

  createUser() {
    const body = { nombre: this.form.controls['nombre'].value, apellido: this.form.controls['apellido'].value, direccion: this.form.controls['direccion'].value, telefono: this.form.controls['telefono'].value, email: this.form.controls['email'].value, genero: this.form.controls['genero'].value, password: this.form.controls['password'].value}
    this.consumeService.createUser(body).subscribe({
      next: () => this.openToast('Usuario creado con exito'),
      error: (err) => this.openAlert(err)
    })
    this.router.navigate(["home"]);
  }
  
  async openToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3500
    });
    toast.present();
  }

}
