'use strict';

(function(){
    
    function ValidateForm(form, logErr, dateErr, textErr, corrForm){
        
        this._form = document.querySelector(form) || document.querySelector('form');
        
        this._logErrors = document.querySelector(logErr) || document.querySelector('#loginError');
        
        this._dateBirthErrors = document.querySelector(dateErr) || document.querySelector('#dateOfBirthError');
        
        this._textErrors = document.querySelector(textErr) || document.querySelector('#textareaError');
        
        this._correctForm = document.querySelector(corrForm) || document.querySelector('#correctForm');
        
        this._assignEvents();
    }
    
    ValidateForm.prototype._assignEvents = function(){
        this._form.addEventListener('submit', this._validateFields.bind(this), true);     
    }
    
    ValidateForm.prototype._validateFields = function(e){
        this._loginAllErrors = ``;
        this._dateAllErrors = ``;
        this._textAllErrors = ``;
        this._correctForm.innerHTML = ``;
        
        
        if(!e.target[0].value){
            this._loginAllErrors = 'Uzupełnij pole e-mail';
        }        
        
        this._mailPattern = /^\w+[.-]*[a-z\d]*@\w+[.-]*[a-z\d]*\.[a-z]{2,8}$/;
        
        if(e.target[0].value && !this._mailPattern.test(e.target[0].value)){
            this._loginAllErrors = 'Pole e-mail musi spełniać wymagania złożoności';
        }
        
        if(!e.target[1].value){
            this._dateAllErrors = 'Uzupełnij pole data urodzenia';
        }
        
        this._dateOfBirthPattern = /^\d{4}-\d{2}-\d{2}$/;
        
        if(e.target[1].value && !this._dateOfBirthPattern.test(e.target[1].value)){
            this._dateAllErrors = 'Pole data urodzenia musi spełniać wymagania złożoności';
        }
        
        if(!e.target[2].value){
            this._textAllErrors = 'Uzupełnij treści wiadomości';
        }
        
        this._textareaPattern = /^\w{6,}$/
        if(e.target[2].value && !this._textareaPattern.test(e.target[2].value)){
            this._textAllErrors = 'Treść wiadomości musi zawierać minimum 6 znaków';
        }
        
        if(this._loginAllErrors == `` && this._dateAllErrors == `` && this._textAllErrors == ``){
            this._correctAll = `Dziękujemy, Twoja wiadomość została przesłana. Odpowiedź wyślemy na maila: ${e.target[0].value}`;
            this._correctAnswer();
        }
        
        this._showErrors();
        e.preventDefault();
    }
    
    
    ValidateForm.prototype._showErrors = function(){
        
        
        this._logErrors.innerHTML = `${this._loginAllErrors}`;
        this._dateBirthErrors.innerHTML = `${this._dateAllErrors}`;
        this._textErrors.innerHTML = `${this._textAllErrors}`;
    }
    
    ValidateForm.prototype._correctAnswer = function(){
        
        this._correctForm.innerHTML = `${this._correctAll}`;
    }
    
    new ValidateForm();
    
})();