import {  Component, signal } from "@angular/core";
import { PostOfficeService } from "../services/postoffice.service";
import { PostOffice } from "../models/postoffice";
import { Router } from '@angular/router';

@Component({
    selector:'postoffice-list',
    templateUrl: '../templates/postofficelist.html',
    styleUrl: '../styles/postofficelist.css'
})

export class PostOfficeListComponent
{
    postOfficeList = signal<PostOffice[]>([]);
    
    constructor(private readonly postOfficeService: PostOfficeService, private readonly router: Router)
    {

    }

    ngOnInit(){
        this.loadPostOffices();
    }

    updatePostOffice(zipCode: string): void {
         this.router.navigate(['/postoffices/update', zipCode]);
    }

    deletePostOffice(zipCode: string): void {
        this.postOfficeService.deletePostOffice(zipCode).subscribe({
            next: () => {
                this.loadPostOffices();
            },
            error: () =>{
                
            }
        });
    }

    loadPostOffices() : void
    {
        this.postOfficeService.getPostOffices().subscribe(data =>
        {
            this.postOfficeList.set(data),
            console.log(data);
         });
    }

}

