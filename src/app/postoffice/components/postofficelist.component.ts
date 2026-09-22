import {  Component, signal } from "@angular/core";
import { PostOfficeService } from "../services/postoffice.service";
import { PostOffice } from "../models/postoffice";

@Component({
    selector:'postoffice-list',
    providers: [PostOfficeService],
    templateUrl: '../templates/postofficelist.html',
    styleUrl: '../styles/postofficelist.css'

})

export class PostOfficeListComponent
{
    postOfficeList = signal<PostOffice[]>([]);
    private postOfficeService: PostOfficeService;
    constructor(postOfficeService: PostOfficeService)
    {
        this.postOfficeService = postOfficeService;
    }

    ngOnInit(){
        this.postOfficeService.getPostOffices().subscribe(data =>
        {
            this.postOfficeList.set(data),
            console.log(data);
         });
    }
    
    removePostOffice(): void{

    }
}

