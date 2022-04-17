window.addEventListener('load', () => {
	const tabs = document.querySelector('.tabs');
	const tabsLink = document.querySelectorAll(".tabs__item");
	const phone__ind = document.getElementById('phone__ind');
	const phone__entity = document.getElementById('phone__entity');
	const phone__rec = document.getElementById('phone__rec');
	const old__card = document.getElementById('old__card');

	document.addEventListener('click', function (event) {
		if (!event.target.hasAttribute('data-show-password')) return;

		let password = document.querySelector(event.target.getAttribute('data-show-password'));

		if (!password) return;

		event.preventDefault();
		if (password.type == 'password') {
			password.setAttribute('type', 'text');
			event.target.classList.add("active");
		} else {
			password.setAttribute('type', 'password');
			event.target.classList.remove("active");
		}
	}, false);

	//tabs
	if (typeof (tabs) != 'undefined' && tabs != null) {
		function myTabClicks(tabClickEvent) {
			for (var i = 0; i < tabsLink.length; i++) {
				tabsLink[i].classList.remove("active");
			}
			var clickedTab = tabClickEvent.currentTarget;
			clickedTab.classList.add("active");
			tabClickEvent.preventDefault();
			var myContentPanes = document.querySelectorAll(".tab-pane");
			for (i = 0; i < myContentPanes.length; i++) {
				myContentPanes[i].classList.remove("active");
			}
			var anchorReference = tabClickEvent.target;
			var activePaneId = anchorReference.getAttribute("href");
			var activePane = document.querySelector(activePaneId);
			activePane.classList.add("active");
		}
		for (i = 0; i < tabsLink.length; i++) {
			tabsLink[i].addEventListener("click", myTabClicks)
		}
	}

	//Phone-mask
	if (typeof (phone__ind) != 'undefined' && phone__ind != null) {
		var phoneMask = IMask(
			document.getElementById('phone__ind'), {
			mask: '+{375} (00) 000-00-00',
			lazy: false,
		}
		);
	}
	//Phone2-mask
	if (typeof (phone__entity) != 'undefined' && phone__entity != null) {
		var phoneMaskEnt = IMask(
			document.getElementById('phone__entity'), {
			mask: '+{375} (00) 000-00-00',
			lazy: false,
		}
		);
	}

	//Phone3-mask
	if (typeof (phone__rec) != 'undefined' && phone__rec != null) {
		var phoneMaskEnt = IMask(
			document.getElementById('phone__rec'), {
			mask: '+{375} (00) 000-00-00',
			lazy: false,
		}
		);
	}

	//old-card-MASK
	if (typeof (old__card) != 'undefined' && old__card != null) {
		var cardMaskEnt = IMask(
			document.getElementById('old__card'), {
			mask: '0 0 0 0 0 0 0',
			lazy: false,
		}
		);
	}


	//calendar
	const inputDate = document.querySelector('input[name="birth__date"]');
	if (typeof (inputDate) != 'undefined' && inputDate != null) {
		const datepicker = new Datepicker(inputDate, {
			format: 'dd.mm.yyyy',
			language: 'ru'
		});

	}


	//accordeon
	document.addEventListener('click', function (event) {
		if (!event.target.classList.contains('accordeon__toggle')) return;
		var content = document.querySelector(event.target.hash);
		if (!content) return;
		event.preventDefault();
		if (content.classList.contains('active')) {
			event.target.innerHTML = "Детали";
			content.classList.remove('active');
			return;
		}
		var accordions = document.querySelectorAll('.accordion__content.active');
		for (var i = 0; i < accordions.length; i++) {
			accordions[i].classList.remove('active');
			event.target.innerHTML = "Детали";
		}
		content.classList.toggle('active');
		event.target.innerHTML = "Скрыть";

	});



	//popup
	const modalTriggers = document.querySelectorAll('.popup-trigger');
	const modalCloseTrigger = document.querySelectorAll('.modal-close');
	const p_modal = document.querySelectorAll('.popup-modal');
	const bodyBlackout = document.querySelector('.body-blackout');

	modalTriggers.forEach(trigger => {
		trigger.addEventListener('click', (e) => {
			e.preventDefault();
			const { popupTrigger } = trigger.dataset;
			const popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`);

			popupModal.classList.add('is--visible');
			bodyBlackout.classList.add('is-blacked-out');

			popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
				popupModal.classList.remove('is--visible')
				bodyBlackout.classList.remove('is-blacked-out')
			});

			bodyBlackout.addEventListener('click', () => {
				popupModal.classList.remove('is--visible')
				bodyBlackout.classList.remove('is-blacked-out')
			});

			popupModal.querySelector('.modal-close').addEventListener('click', () => {
				popupModal.classList.remove('is--visible')
				bodyBlackout.classList.remove('is-blacked-out')
			});
		})
	});

	//file
	if($('#attached').length>0){
		var fileTarget = $('#attached');
		fileTarget.on('change', function(){
			if(window.FileReader){
				var filename = $(this)[0].files[0].name;
			} else {
				var filename = $(this).val().split('/').pop().split('\\').pop();
			}
			$(this).parent('.input-wrap').prev('.attached-file').prepend('<div class="file-item"><div class="file-info"><span>'+filename+'</span><a href="javascript:;" class="file-del"></a></div></div>');
		});
		$(document).on('click','.file-del',function(){
		  	$(this).parents('.file-info').remove();
		}); 
	}

	//ACCORDEON2
    $("body").on("click", ".address-accordeon__link", function(e){
        e.preventDefault();
        $(this).parents('.address-accordeon__item').toggleClass('active');
        $(this).parents('.address-accordeon__item').find('.address-accordeon__info').slideToggle(10);
    });

	if ($('#contacts_map').length>0) {
        ymaps.ready(initializeContacts);
    };
});


// functions

function initializeContacts() {
	var myMap = new ymaps.Map("contacts_map", {
		center:[53.879888,27.586757],
		zoom: 13,
		controls: []
	}, {
		suppressMapOpenBlock: true
	}); 
			
	var myPlacemark = new ymaps.Placemark([53.879888,27.586757],{
			// balloonContentBody: 'Адрес',
		},{
		iconLayout: 'default#image',
	}); 

	myMap.controls.add(new ymaps.control.ZoomControl({options: { position: { right: 20, top: 50 }}}));
	myMap.behaviors.disable('scrollZoom');

	myMap.geoObjects.add(myPlacemark);
}


function ValidateEmail() {
	var email = document.getElementById("email__entity").value;
	var lblError = document.getElementById("lblError");
	lblError.innerHTML = "";
	var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (!expr.test(email)) {
		lblError.innerHTML = "Неверный email";
	}
}