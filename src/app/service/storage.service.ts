import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";
import { environment } from '../../environments/environment.prod';

const secretKey = environment.key;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveStorageItem(key: string, value: string) {
    let data = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      secretKey
    ).toString();
    //console.log("Value",data)
    //this.cookieService.set(key, data);
    localStorage.setItem(key, data);
  }

  getStorageItem(key: string): string {
    //let cookieValue = this.cookieService.get(key);
    let storageValue = localStorage.getItem(key);

    if(storageValue){
      let bytes = CryptoJS.AES.decrypt(storageValue, secretKey);
      let originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return originalText;
    }else{
      return null;
    }
  }

  removeStorageItem(key: string): void {
    //this.cookieService.delete(key);
    localStorage.removeItem(key);
  }

  
}
