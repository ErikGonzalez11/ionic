import { Component, OnInit } from '@angular/core';
import { ConsumeService } from '../services/consume/consume.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productList: any[] = [];
  quantity:number=0;
  constructor(private consumeService: ConsumeService,private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getCarrito();
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

  getProducts() {
    this.consumeService.getProducts().subscribe({
      next: (resp) => this.productList = resp,
      error: (err) => this.openAlert(err)
    })
  }

  getCarrito() {
    this.consumeService.getProducts().subscribe({
      next: (productos) => {
        this.consumeService.productos = productos;
        debugger
        this.consumeService.getCarrito().subscribe({
          next: (carritoUsuario) => {
            debugger
            console.log("hola2");
            console.log(carritoUsuario);
            if (!carritoUsuario || !carritoUsuario[0] || !carritoUsuario[0].productos || carritoUsuario[0].productos.length === 0) {
              console.log("El carrito está vacío");
              this.productList = [];
              return;
            }
            console.log("antes")
            console.log(this.productList)
            console.log(carritoUsuario)
            
            this.productList = carritoUsuario[0].productos.map((item: { id: number; cantidad: number }) => {
              console.log("despues")
            console.log(this.productList)
              const producto = this.consumeService.productos.find(prod => prod.id === item.id);
              console.log("Producto encontrado:", producto);
              return {
                producto,
                cantidad: item.cantidad
              };
            });
            console.log("Productos en el carrito:", this.productList);
          },
          error: (err) => {
            console.error("Error al obtener el carrito:", err);
          }
        });
      },
      error: (err) => {
        console.error("Error al obtener los productos:", err);
      }
    });
  }

  eliminarProducto(index: any) {
    debugger
    console.log(this.productList)
    console.log(this.productList[0].producto)

    let productoEncontrado = false;

    let indexAEliminar = -1;

    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].producto.id === index) {
        indexAEliminar = i;
        break;
      }
    }
    if (indexAEliminar !== -1) {
      this.productList.splice(indexAEliminar, 1);
      console.log("El producto con el ID 52e9 fue eliminado.");
    } else {
      console.log("El producto con el ID 52e9 no fue encontrado.");
    }
    console.log(this.productList)
    this.consumeService.deleteProductoCarrito(this.productList).subscribe({
      next: () => {
        console.log("Producto eliminado del carrito correctamente");
      },
      error: (err) => {
        console.error("Error al eliminar producto del carrito:", err);
      }
    });
  }
  
  
  
  
  
  
}
