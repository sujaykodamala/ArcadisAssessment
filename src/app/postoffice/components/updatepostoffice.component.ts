import { Component, Input } from "@angular/core";
import { PostOfficeService } from "../services/postoffice.service";
import { API_URLS } from "../../constants/api.constants";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UpdatePostOfficeRequest } from "../models/updatepostofficerequest";

@Component({
    selector: 'update-postoffice',
    templateUrl: '../templates/updatepostoffice.html',
    imports: [ReactiveFormsModule],
    styleUrl: '../styles/updatepostoffice.css'
})

export class UpdatePostOfficeComponent
{
    constructor(private readonly postOfficeService: PostOfficeService)
    {
        
    }

    @Input() zipCode!: string;

    updateForm = new FormGroup({
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required)
    });

    updatePostOffice()
    {
        const request: UpdatePostOfficeRequest = ({
            city: this.updateForm.value.city ?? '',
            state: this.updateForm.value.state ?? ''
        });
        this.postOfficeService.updatePostOffice(`${API_URLS.POST_OFFICES}/${this.zipCode}`, request);
    }
}