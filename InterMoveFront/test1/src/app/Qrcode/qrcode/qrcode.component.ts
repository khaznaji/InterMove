import { Component } from '@angular/core';
import { QrcodeService } from '../../shared/qrcode.service';
import { QrCode } from '../../model/QrCode/qrcode.model';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
})
export class QrcodeComponent {
  qrCode!: QrCode;

  constructor(private qrCodeService: QrcodeService) {}

  onSubmit(link: string) {
    this.qrCodeService.createQRCode(link)
      .subscribe(qrCode => this.qrCode = qrCode);
  }
}
