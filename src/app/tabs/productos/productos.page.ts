import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ConsumeService } from 'src/app/services/consume/consume.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productList: any[] = []
  constructor(
    private consumeService: ConsumeService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController

  ) { }

  ngOnInit() {
  }

  getProducts() {
    this.consumeService.getProducts().subscribe({
      next: (resp) => this.productList = resp,
      error: (err) => this.openAlert(err)
    })
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
  goTo(url: string) {
    this.router.navigate([url]);
  }
  async openToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3500
    });
    toast.present();
  }

  createCarrito() {
    const body = { }
    this.consumeService.createUser(body).subscribe({
      next: () => this.openToast('Usuario creado con exito'),
      error: (err) => this.openAlert(err)
    })
    this.router.navigate(["home"]);
  }

}
