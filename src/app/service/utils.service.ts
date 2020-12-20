import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap-notify';

import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private imageFileTypes = [
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
  ];

  validateFile(file: File): boolean {
    return this.imageFileTypes.includes(file.type);
  }


  showNotification(icon, message, type, from, align){

    $.notify({
        icon: icon,
        message: message
    },{
        type: type,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          `<i class="material-icons" data-notify="icon">${icon}</i> ` +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  previewPdfFile(data) {  
    let docDefinition = {
      content: [
        {
          text: 'V-BARBERSHOP',
          fontSize: 25,
          alignment: 'center',
          color: '#000000'
        },
        {
          text: data.address,
          fontSize: 12,
          alignment: 'center',
          color: '#000000',
          margin: [0, 15,0, 0]     
        },
        {
          text: `==============================================================================`,
          fontSize: 12,
          alignment: 'center',
          color: '#000000',
          margin: [0, 15,0, 15]  
        },
        {
          text: 'HÓA ĐƠN THANH TOÁN',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: '000000'
        },
        {
          text: 'Thông tin khách hàng',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: `Tên khách hàng: ${data.customerName}`,
                bold:true
              },
              { text: data.email ? `Email: ${data.email}` : ''},
              { text: data.contactNo? `Số điện thoại: ${data.contactNo}` : '' }
            ],
            [
              {
                text: `Vào: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              { 
                text: `Số phiếu : ${data.billNo}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Dịch vụ sử dụng',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Dịch vụ', 'Giá tiền', 'Số lượng', 'Thành tiền'],
              ...data.services.map(p => ([p.name, this.formatNumber(p.price), 1, this.formatNumber((p.price*1).toFixed(2))])),
              [{text: 'Tổng cộng', colSpan: 3}, {}, {}, this.formatNumber(data.services.reduce((sum, p)=> sum + (1 * p.price), 0).toFixed(2))]
            ]
          }
        },
        {
          text: `==============================================================================`,
          fontSize: 12,
          alignment: 'center',
          color: '#000000',
          margin: [0, 15,0, 15]  
        },
        {
          text: 'Cảm ơn và hẹn gặp lại quý khách!',
          fontSize: 16,
          alignment: 'center',
          color: '#000000',
          bold: true
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };
    pdfMake.createPdf(docDefinition).print();
  } 

  formatNumber(num) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num)
  }

  addHoursToDate(date: Date, hours: number): Date {
    return new Date(new Date(date).setHours(date.getHours() + hours));
  }

}  