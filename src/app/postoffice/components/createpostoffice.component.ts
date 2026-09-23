import { Component } from "@angular/core";
import { PostOfficeService } from "../services/postoffice.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PostOffice } from "../models/postoffice";

@Component({
    selector: 'create-postoffice',
    templateUrl: '../templates/createpostoffice.html',
    imports: [ReactiveFormsModule],
    styleUrl: '../styles/createpostoffice.css'
})

export class CreatePostOfficeComponent
{

    constructor(private readonly postOfficeService: PostOfficeService)
    {
        
    }

    createForm= new FormGroup({
        zipCode : new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required)
    })

    save() : void
    {
        const request: PostOffice = {
            zipCode: this.createForm.value.zipCode ?? '',
            city: this.createForm.value.city ?? '',
            state: this.createForm.value.state ?? ''
        };
        this.postOfficeService
                   .createPostOffice(request)
                   .subscribe(data => { 
                   });
    }

    
}