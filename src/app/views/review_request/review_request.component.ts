//Native Imports
import { Component, OnInit, ElementRef, Renderer, ViewChild, NgZone  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';

//Third Party Imports
import { default as swal } from 'sweetalert2';
import {ModalDirective} from 'ngx-bootstrap';
declare var pdfMake: any;

@Component({
  selector: 'review_request',
  templateUrl: 'review_request.template.html'
})

export class ReviewRequestComponent implements OnInit{
    @ViewChild('do_request_pdf_modal') doRequestModal: ModalDirective;//send resolution request modal reference
    private userId:String;//store logged in UserId
    private pdf:any;//pdf reference
    private requests:any;//variable to store requests
    private requestOffsetRight:number;//requestTable offset to control request browsing
    private requestOffsetLeft:number;//requestTable offset to control request browsing
    private currentRequest:any;//store current request
    private currentIndex:any;//store current index
    //XteamRequestComponent Constructor FormBuilder reference, router reference, XteamService reference
	constructor(private router:Router){
		//Initialize variables
        this.requests = [];//initially empty
        this.requestOffsetRight = 0;//set as 0
        this.requestOffsetLeft = 0;//set as 0
	}

	ngOnInit() {
        //get requests on load
        this.getRequests();
    }

    //setCurrentRequest(): Save current request to work on top of it
    setCurrentRequest(index){
        this.currentRequest = this.requests[index];
        this.currentIndex = index;
    }

    approve(){
        this.requests[this.currentIndex].status = "Approved";
        this.approveSuccess();
        this.doRequestModal.hide();
    }


    deny(){
        this.requests[this.currentIndex].status = "Denied";
        this.denySuccess();
        this.doRequestModal.hide();
    }

    //alert user if deny was successfull
    denySuccess() {
        swal({
            title: "Request Denied",
            text: "The selected request has been denied",
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Oh Well!',
            allowOutsideClick: false,
            type: "warning"
        }).catch(swal.noop)
    }

    //alert user if approve was successfull
    approveSuccess() {
        swal({
            title: "Approved Successfully",
            text: "The selected request has been approved!",
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Awesome!',
            allowOutsideClick: false,
            type: "success"
        }).catch(swal.noop)
    }

    //alert user if there is an internal server error
    internalServerError() {
        swal({
            title: "Internal Server Error",
            text: "Internal Server Error. Be sure you started the backend server before running the frontend. If it still doesn't work, contact Makoto.",
            type: "warning",
            allowOutsideClick: false
        }).catch(swal.noop)
    }

    //get requests from database
    getRequests(){
        //set load to send to the backend server
        this.requests = [{
            id_request:"09",
            first_name:"Eduardo Makoto",
            creation_date:"29/09/201704:00",
            last_name:"Katsumata Rosales",
            profession:"Ing. Sistemas Computacionales",
            motto:"I love life!",
            question1:"Awesome!",
            question2:"Wow!",
            status:"Pending"
        },
        {
            id_request:"08",
            first_name:"Kelly Loany",
            creation_date:"29/09/201707:00",
            last_name:"Salinas López",
            profession:"Ing. Sistemas Computacionales",
            motto:"I love life!",
            question1:"Awesome!",
            question2:"Wow!",
            status:"Approved"},
        {
            id_request:"07",
            first_name:"Javier Akinori",
            creation_date:"29/09/201705:00",
            last_name:"Katsumata Rosales",
            profession:"Ing. Sistemas Computacionales",
            motto:"I love life!",
            question1:"Awesome!",
            question2:"Wow!",
            status:"Pending"},
            {
            id_request:"06",
            first_name:"Migdalia Mity",
            creation_date:"29/09/201704:00",
            last_name:"Rosales Paredes",
            profession:"Ing. Sistemas Computacionales",
            motto:"I love life!",
            question1:"Awesome!",
            question2:"Wow!",
            status:"Pending"
        },
        {
            id_request:"05",
            first_name:"Cesar Francisco",
            creation_date:"29/09/201707:00",
            last_name:"Armando Paredes",
            profession:"Ing. Sistemas Computacionales",
            motto:"I love life!",
            question1:"Awesome!",
            question2:"Wow!",
            status:"Approved"},
        {
            id_request:"04",
            first_name:"Nelson Arambú",
            creation_date:"29/09/201705:00",
            last_name:"Peter Jhon",
            profession:"Ing. Sistemas Computacionales",
            motto:"I love life!",
            question1:"Awesome!",
            question2:"Wow!",
            status:"Pending"},
            {
            id_request:"03",
            first_name:"Williams Williamser",
            creation_date:"29/09/201704:00",
            last_name:"Williamsest",
            profession:"Ing. Sistemas Computacionales",
            motto:"I love life!",
            question1:"Awesome!",
            question2:"Wow!",
            status:"Pending"
        },
        {
            id_request:"02",
            first_name:"Anne Frank",
            creation_date:"29/09/201707:00",
            last_name:"Frank Anne",
            profession:"Ing. Sistemas Computacionales",
            motto:"I love life!",
            question1:"Awesome!",
            question2:"Wow!",
            status:"Approved"},
        {
            id_request:"01",
            first_name:"I'm Blue",
            creation_date:"29/09/201705:00",
            last_name:"Da Bu Di",
            profession:"Ing. Sistemas Computacionales",
            motto:"I love life!",
            question1:"Awesome!",
            question2:"Wow!",
            status:"Pending"}];
        if(this.requests.length < 5){
            this.requestOffsetRight = this.requests.length;
        }else{//if not, set to 5
            this.requestOffsetRight = 5;
        }
        this.requestOffsetLeft = 1;
        //Sort requests using compare object
        this.requests.sort(this.compare);
    }

    //updateRequestsGoRight(): Update request offsets when user clicks right arrow
    updateRequestsGoRight(){
        if(this.requests.length > 0){
            //Verify if requestOffsetRight overloads requests length
            if(this.requests.length< this.requestOffsetRight+5){
                this.requestOffsetRight = this.requests.length;
            }else{//if not, set to 5
                this.requestOffsetRight = this.requestOffsetRight + 5;
            }
            this.requestOffsetLeft = this.requestOffsetLeft + 5;
        }
    }

    //updateRequestsGoLeft(): Update requests offsets when user clicks left arrow
    updateRequestsGoLeft(){
        if(this.requests.length > 0){
            //check if last element
            if(this.requests.length == this.requestOffsetRight){
                this.requestOffsetLeft = this.requestOffsetLeft - 5;
                this.requestOffsetRight = this.requestOffsetLeft + 4;
            }else{//if not last element
                this.requestOffsetLeft = this.requestOffsetLeft - 5;
                this.requestOffsetRight = this.requestOffsetRight - 5;
            }
        }
    }

    //compare requests
    compare(a,b) {
      if (a.id_request > b.id_request)
        return -1;
      if (a.id_request < b.id_request)
        return 1;
      return 0;
    }
	//generatePdf(): Frontend method to create a PDF off the request_form values
	generatePdf(first_name, last_name, profession, motto, question1, question2){
        this.pdf = pdfMake;//pdfMake reference stored in pdf variable

        var docDefinition = {
            info: {
                title: 'X-Team Application',
                author: 'Makoto',
                subject: 'X-Team Application',
                keywords: 'X-Team Application',
                creator: 'Makoto',
                producer: 'Makoto'
            },
            pageSize: 'LETTER',
            pageOrientation: 'portrait',

            content: [
            	{text: "X-Team Job Application", style:'header'},
            	{text: "\n"},
            	{text: "Coding Challenge: ", style:'header2'},
            	{text: "I managed to complete the challenge!", style:'text'},
            	{text: "\n"},
            	{text: "First Name: ", style:'header2'},
            	{text: first_name, style:'text'},
            	{text: "\n"},
            	{text: "Last Name: ", style:'header2'},
            	{text: last_name, style:'text'},
            	{text: "\n"},
            	{text: "Profession: ", style:'header2'},
            	{text: profession, style:'text'},
            	{text: "\n"},
            	{text: "Motto: ", style:'header2'},
            	{text: motto, style:'text'},
            	{text: "\n"},
            	{text: "Have you worked remotely before?", style:'header2'},
            	{text: question1, style:'text'},
            	{text: "\n"},
            	{text: "What do you expect from us?", style:'header2'},
            	{text: question2, style:'text'},
            	{text: "\n"}
            ],

            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                },
                header2: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'left'
                },
                text: {
                    fontSize: 12
                }
            }
        }

        //Set iframe source to pdf blob data
        this.pdf.createPdf(docDefinition).getDataUrl(function (outDoc) {
               document.getElementById('pdfFrame').setAttribute('src',outDoc);
        });
    }
}