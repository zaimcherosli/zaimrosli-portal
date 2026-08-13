'use strict';

const gHost = window.location.origin;
//console.log(gHost);
const gUrlTitle = 'PropMall';


/*****************************************************************/

const coMediaQueryXS = window.matchMedia('(max-width: 575px)');
const coMediaQuerySM = window.matchMedia('(min-width: 576px)');
const coMediaQueryMD = window.matchMedia('(min-width: 768px)');
const coMediaQueryLG = window.matchMedia('(min-width: 992px)');
const coMediaQueryXL = window.matchMedia('(min-width: 1200px)');
const coMediaQueryXXL = window.matchMedia('(min-width: 1400px)');

function fGetMediaSize(){
	let vMediaSize = "XS";

	if ( coMediaQueryXXL.matches )
		vMediaSize = "XXL";
	else if ( coMediaQueryXL.matches )
		vMediaSize = "XL";
	else if ( coMediaQueryLG.matches )
		vMediaSize = "LG";
	else if ( coMediaQueryMD.matches )
		vMediaSize = "MD";
	else if ( coMediaQuerySM.matches )
		vMediaSize = "SM";
	else
		vMediaSize = "XS";

	return vMediaSize;
}


async function fIsAlive (){

	const coResponseIsAlive = await fetch( gHost + "/isalive" );
	const coDataIsAlive = await coResponseIsAlive.text();
//console.log( coDataIsAlive.toString().trim() );
	
	if ( coDataIsAlive.toString().trim() == "FALSE" ){

		window.location.replace( gHost + "/expired" );
		return;

	}

}


/*****************************************************************/

let gLaskeaPromo = null;

const coEleModalDivModalLaskeaPromo = document.getElementById('DivModalLaskeaPromo');

const coModalDivModalLaskeaPromo = ( coEleModalDivModalLaskeaPromo !== null && typeof coEleModalDivModalLaskeaPromo == "object" ) ? new bootstrap.Modal( coEleModalDivModalLaskeaPromo ) : null;

const coBtnCloseModalLaskeaPromo = document.getElementById('BtnCloseModalLaskeaPromo');

if (
	coBtnCloseModalLaskeaPromo !== null && typeof coBtnCloseModalLaskeaPromo == "object"
){

	coBtnCloseModalLaskeaPromo.addEventListener( 'click', function(){

		fBtnCloseModalLaskeaPromo();

	});

}

async function fBtnCloseModalLaskeaPromo() {

	fIsAlive();
	

	let vUrl = gHost + "/terms-of-service/privacy/community/policy?laskeapromo=" + gLaskeaPromo;
//console.log(vUrl);

	const coResponse = await fetch( vUrl )

//	const coData = await coResponse.text();
	const coData = await coResponse.json();
//console.log(coData);
}


/*****************************************************************/

const coEleModalLaskeaOnlyInPremium = document.getElementById('ModalLaskeaOnlyInPremium');
const coEleModalLaskeaOnlyInPremiumMessage = document.getElementById('ModalLaskeaOnlyInPremiumMessage');

if (
	coEleModalLaskeaOnlyInPremium !== null && typeof coEleModalLaskeaOnlyInPremium == "object"
	){

	coEleModalLaskeaOnlyInPremium.addEventListener( 'hidden.bs.modal', function( oEvent ){

		coEleModalLaskeaOnlyInPremiumMessage.innerHTML = 'This features are only available for Laskea Premium subscribers.';

	});

}

const coEleModalLaskeaOnlyInPremiumCustomDomainNameWebsite = document.getElementById('ModalLaskeaOnlyInPremiumCustomDomainNameWebsite');


/*****************************************************************/


const coEleModalListingInfo = document.getElementById('ModalListingInfo');
const coEleModalListingMarkBooked = document.getElementById('ModalListingMarkBooked');
const coEleModalListingMarkSold = document.getElementById('ModalListingMarkSold');


let oEleModalListingInfoShowStatus = 'NO';
let oEleModalListingMarkBookedShowStatus = 'NO';
let oEleModalListingMarkSoldShowStatus = 'NO';

let vObjTrackInvokerModalListingInfo = null; 


const coModalListingInfo = ( coEleModalListingInfo !== null && typeof coEleModalListingInfo == "object" ) ? new bootstrap.Modal( coEleModalListingInfo ) : null;

const coModalListingMarkBooked = ( coEleModalListingMarkBooked !== null && typeof coEleModalListingMarkBooked == "object" ) ? new bootstrap.Modal( coEleModalListingMarkBooked ) : null;

const coModalListingMarkSold = ( coEleModalListingMarkSold !== null && typeof coEleModalListingMarkSold == "object" ) ? new bootstrap.Modal( coEleModalListingMarkSold ) : null;

//const coParaListingID = ( coEleModalListingInfo !== null && typeof coEleModalListingInfo == "object" ) ? document.getElementById('ParaListingID') : null;

const coEleModalListingInfoBody = ( coEleModalListingInfo !== null && typeof coEleModalListingInfo == "object" ) ? document.getElementById('ModalListingInfoBody') : null;


if ( coEleModalListingInfo !== null && typeof coEleModalListingInfo == "object" ){

	coEleModalListingInfo.addEventListener( 'hidden.bs.modal', function () {

		//coParaListingID.innerHTML = '';

		coEleModalListingInfoBody.innerHTML = '';

		oEleModalListingInfoShowStatus = 'NO';

	});


	coEleModalListingInfo.addEventListener( 'shown.bs.modal', function () {

		oEleModalListingInfoShowStatus = 'YES';

	});

}

if ( coEleModalListingMarkBooked !== null && typeof coEleModalListingMarkBooked == "object" ){

	coEleModalListingMarkBooked.addEventListener( 'hidden.bs.modal', function () {
		
		oEleModalListingMarkBookedShowStatus = 'NO';

	});


	coEleModalListingMarkBooked.addEventListener( 'shown.bs.modal', function () {

		oEleModalListingMarkBookedShowStatus = 'YES';

	});

}

if ( coEleModalListingMarkSold !== null && typeof coEleModalListingMarkSold == "object" ){

	coEleModalListingMarkSold.addEventListener( 'hidden.bs.modal', function () {
		
		oEleModalListingMarkSoldShowStatus = 'NO';
		
	});


	coEleModalListingMarkSold.addEventListener( 'shown.bs.modal', function () {

		oEleModalListingMarkSoldShowStatus = 'YES';

	});

}


const coEleModalListingInfoDivColEdit = document.getElementById('ModalListingInfoDivColEdit');
const coEleModalListingInfoHrefEdit = document.getElementById('ModalListingInfoHrefEdit');

const coEleModalListingInfoDivColDelete = document.getElementById('ModalListingInfoDivColDelete');
const coEleModalListingInfoBtnDelete = document.getElementById('ModalListingInfoBtnDelete');

const coEleModalListingInfoDivColPublish = document.getElementById('ModalListingInfoDivColPublish');
const coEleModalListingInfoBtnPublish = document.getElementById('ModalListingInfoBtnPublish');

const coEleModalListingInfoDivColRepost = document.getElementById('ModalListingInfoDivColRepost');
const coEleModalListingInfoBtnRepost = document.getElementById('ModalListingInfoBtnRepost');

const coEleModalListingInfoDivColRepublish = document.getElementById('ModalListingInfoDivColRepublish');
const coEleModalListingInfoBtnRepublish = document.getElementById('ModalListingInfoBtnRepublish');

const coEleModalListingInfoDivColUnpublish = document.getElementById('ModalListingInfoDivColUnpublish');
const coEleModalListingInfoBtnUnpublish = document.getElementById('ModalListingInfoBtnUnpublish');

const coEleModalListingInfoDivColReactivate = document.getElementById('ModalListingInfoDivColReactivate');
const coEleModalListingInfoBtnReactivate = document.getElementById('ModalListingInfoBtnReactivate');

const coEleModalListingInfoDivColDeactivate = document.getElementById('ModalListingInfoDivColDeactivate');
const coEleModalListingInfoBtnDeactivate = document.getElementById('ModalListingInfoBtnDeactivate');

const coEleModalListingInfoDivColMarkUnbooked = document.getElementById('ModalListingInfoDivColMarkUnbooked');
const coEleModalListingInfoBtnMarkUnbooked = document.getElementById('ModalListingInfoBtnMarkUnbooked');

const coEleModalListingInfoDivColMarkBooked = document.getElementById('ModalListingInfoDivColMarkBooked');
const coEleModalListingInfoBtnMarkBooked = document.getElementById('ModalListingInfoBtnMarkBooked');

const coEleModalListingInfoDivColMarkSold = document.getElementById('ModalListingInfoDivColMarkSold');
const coEleModalListingInfoBtnMarkSold = document.getElementById('ModalListingInfoBtnMarkSold');

const coEleModalListingInfoDivColMarkTenanted = document.getElementById('ModalListingInfoDivColMarkTenanted');
const coEleModalListingInfoBtnMarkTenanted = document.getElementById('ModalListingInfoBtnMarkTenanted');

const coEleModalListingInfoDivColCoMarketing = document.getElementById('ModalListingInfoDivColCoMarketing');
const coEleModalListingInfoBtnCoMarketing = document.getElementById('ModalListingInfoBtnCoMarketing');

const coEleModalListingInfoDivColShare = document.getElementById('ModalListingInfoDivColShare');
const coEleModalListingInfoBtnShare = document.getElementById('ModalListingInfoBtnShare');

const coModalListingInfoDivColShareMulti = document.getElementById('ModalListingInfoDivColShareMulti');

const coEleModalListingInfoBtnDownloadZipXS = document.getElementById('ModalListingInfoBtnDownloadZipXS');


const coEleFormModalListingMarkBooked = document.getElementById('FormModalListingMarkBooked');
const coEleFormModalListingMarkBookedInputAmount = document.getElementById('FormModalListingMarkBookedInputAmount');

const coEleFormModalListingMarkSold = document.getElementById('FormModalListingMarkSold');
const coEleFormModalListingMarkSoldInputAmount = document.getElementById('FormModalListingMarkSoldInputAmount');

const coListing = {
					IdListing 			: 	null,
					Ownership 			: 	null,
					Modus 				: 	null,
					Exclusive 			: 	null,
					CoMarketingStatus 	: 	null,
					RepostDateTime		:   null,

					coStatusDetail		: 	null,
					StatusDetail 		: 	null
				};
//vIdListing vListingOwnership vListingModus vListingStatusDetail vListingExclusive  vListingCoMarketingStatus


if ( coEleModalListingInfoBtnDelete !== null && typeof coEleModalListingInfoBtnDelete == "object" ) {

	coEleModalListingInfoBtnDelete.addEventListener( 'click', function () {
		fListingDelete();
	});

}

if ( coEleModalListingInfoBtnPublish !== null && typeof coEleModalListingInfoBtnPublish == "object" ) {

	coEleModalListingInfoBtnPublish.addEventListener( 'click', function () {
		fListingPublish();
	});

}

if ( coEleModalListingInfoBtnRepost !== null && typeof coEleModalListingInfoBtnRepost == "object" ) {

	coEleModalListingInfoBtnRepost.addEventListener( 'click', function () {
		fListingRepost();
	});

}

if ( coEleModalListingInfoBtnRepublish !== null && typeof coEleModalListingInfoBtnRepublish == "object" ) {

	coEleModalListingInfoBtnRepublish.addEventListener( 'click', function () {
		fListingRepublish();
	});

}

if ( coEleModalListingInfoBtnUnpublish !== null && typeof coEleModalListingInfoBtnUnpublish == "object" ) {

	coEleModalListingInfoBtnUnpublish.addEventListener( 'click', function () {
		fListingUnpublish();
	});

}

if ( coEleModalListingInfoBtnReactivate !== null && typeof coEleModalListingInfoBtnReactivate == "object" ) {

	coEleModalListingInfoBtnReactivate.addEventListener( 'click', function () {
		fListingReactivate();
	});

}

if ( coEleModalListingInfoBtnDeactivate !== null && typeof coEleModalListingInfoBtnDeactivate == "object" ) {

	coEleModalListingInfoBtnDeactivate.addEventListener( 'click', function () {
		fListingDeactivate();
	});

}

if ( coEleModalListingInfoBtnMarkUnbooked !== null && typeof coEleModalListingInfoBtnMarkUnbooked == "object" ) {

	coEleModalListingInfoBtnMarkUnbooked.addEventListener( 'click', function () {
		fListingMarkUnbooked();
	});

}

if ( coEleModalListingInfoBtnMarkBooked !== null && typeof coEleModalListingInfoBtnMarkBooked == "object" ) {

	coEleModalListingInfoBtnMarkBooked.addEventListener( 'click', function () {

		const coModalListingMarkBookedSpanLabelForSale = document.getElementById('ModalListingMarkBookedSpanLabelForSale');
		
		const coModalListingMarkBookedSpanLabelForRent = document.getElementById('ModalListingMarkBookedSpanLabelForRent');
		

		if ( coListing.Modus == 'FOR SALE' ) {

			coModalListingMarkBookedSpanLabelForSale.classList.remove('d-none');

			coModalListingMarkBookedSpanLabelForRent.classList.add('d-none');

		}
		else if ( coListing.Modus == 'FOR RENT' ){
			
			coModalListingMarkBookedSpanLabelForSale.classList.add('d-none');
			
			coModalListingMarkBookedSpanLabelForRent.classList.remove('d-none');
			
		}

		coEleFormModalListingMarkBookedInputAmount.value = '';

		coModalListingInfo.hide();
		coModalListingMarkBooked.show();

		//fListingMarkBooked();
	});

}

if ( coEleModalListingInfoBtnMarkSold !== null && typeof coEleModalListingInfoBtnMarkSold == "object" ) {

	coEleModalListingInfoBtnMarkSold.addEventListener( 'click', function () {
		
		const coModalListingMarkSoldHeaderSpanLabelForSale = document.getElementById('ModalListingMarkSoldHeaderSpanLabelForSale');
		const coModalListingMarkSoldBodySpanLabelForSale = document.getElementById('ModalListingMarkSoldBodySpanLabelForSale');
		const coModalListingMarkSoldFooterSpanLabelForSale = document.getElementById('ModalListingMarkSoldFooterSpanLabelForSale');
		
		const coModalListingMarkSoldHeaderSpanLabelForRent = document.getElementById('ModalListingMarkSoldHeaderSpanLabelForRent');
		const coModalListingMarkSoldBodySpanLabelForRent = document.getElementById('ModalListingMarkSoldBodySpanLabelForRent');
		const coModalListingMarkSoldFooterSpanLabelForRent = document.getElementById('ModalListingMarkSoldFooterSpanLabelForRent');
		
		
		if ( coListing.Modus == 'FOR SALE' ) {
			
			coModalListingMarkSoldHeaderSpanLabelForSale.classList.remove('d-none');
			coModalListingMarkSoldBodySpanLabelForSale.classList.remove('d-none');
			coModalListingMarkSoldFooterSpanLabelForSale.classList.remove('d-none');
			
			coModalListingMarkSoldHeaderSpanLabelForRent.classList.add('d-none');
			coModalListingMarkSoldBodySpanLabelForRent.classList.add('d-none');
			coModalListingMarkSoldFooterSpanLabelForRent.classList.add('d-none');
			
		}
		else if ( coListing.Modus == 'FOR RENT' ){
			
			coModalListingMarkSoldHeaderSpanLabelForSale.classList.add('d-none');
			coModalListingMarkSoldBodySpanLabelForSale.classList.add('d-none');
			coModalListingMarkSoldFooterSpanLabelForSale.classList.add('d-none');
			
			coModalListingMarkSoldHeaderSpanLabelForRent.classList.remove('d-none');
			coModalListingMarkSoldBodySpanLabelForRent.classList.remove('d-none');
			coModalListingMarkSoldFooterSpanLabelForRent.classList.remove('d-none');
			
		}

		coEleFormModalListingMarkSoldInputAmount.value = '';


		coModalListingInfo.hide();
		coModalListingMarkSold.show();
		
		//fListingMarkSold();

	});

}

if ( coEleModalListingInfoBtnMarkTenanted !== null && typeof coEleModalListingInfoBtnMarkTenanted == "object" ) {

	coEleModalListingInfoBtnMarkTenanted.addEventListener( 'click', function() {
		
		const coModalListingMarkSoldHeaderSpanLabelForSale = document.getElementById('ModalListingMarkSoldHeaderSpanLabelForSale');
		const coModalListingMarkSoldBodySpanLabelForSale = document.getElementById('ModalListingMarkSoldBodySpanLabelForSale');
		const coModalListingMarkSoldFooterSpanLabelForSale = document.getElementById('ModalListingMarkSoldFooterSpanLabelForSale');
		
		const coModalListingMarkSoldHeaderSpanLabelForRent = document.getElementById('ModalListingMarkSoldHeaderSpanLabelForRent');
		const coModalListingMarkSoldBodySpanLabelForRent = document.getElementById('ModalListingMarkSoldBodySpanLabelForRent');
		const coModalListingMarkSoldFooterSpanLabelForRent = document.getElementById('ModalListingMarkSoldFooterSpanLabelForRent');
		
		
		if ( coListing.Modus == 'FOR SALE' ) {
			
			coModalListingMarkSoldHeaderSpanLabelForSale.classList.remove('d-none');
			coModalListingMarkSoldBodySpanLabelForSale.classList.remove('d-none');
			coModalListingMarkSoldFooterSpanLabelForSale.classList.remove('d-none');
			
			coModalListingMarkSoldHeaderSpanLabelForRent.classList.add('d-none');
			coModalListingMarkSoldBodySpanLabelForRent.classList.add('d-none');
			coModalListingMarkSoldFooterSpanLabelForRent.classList.add('d-none');
			
		}
		else if ( coListing.Modus == 'FOR RENT' ){
			
			coModalListingMarkSoldHeaderSpanLabelForSale.classList.add('d-none');
			coModalListingMarkSoldBodySpanLabelForSale.classList.add('d-none');
			coModalListingMarkSoldFooterSpanLabelForSale.classList.add('d-none');
			
			coModalListingMarkSoldHeaderSpanLabelForRent.classList.remove('d-none');
			coModalListingMarkSoldBodySpanLabelForRent.classList.remove('d-none');
			coModalListingMarkSoldFooterSpanLabelForRent.classList.remove('d-none');
			
		}


		coModalListingInfo.hide();
		coModalListingMarkSold.show();
		
		//fListingMarkTenanted();

	});

}

if ( coEleModalListingInfoBtnDownloadZipXS !== null && typeof coEleModalListingInfoBtnDownloadZipXS == "object" ){

	coEleModalListingInfoBtnDownloadZipXS.addEventListener( 'click', function () {

		fListingDownloadZip();

	});
	
}

if ( coEleFormModalListingMarkBooked !== null && typeof coEleFormModalListingMarkBooked == "object" ){

	coEleFormModalListingMarkBooked.addEventListener( 'submit', function () {
		fListingMarkBooked();
	});

}

if ( coEleFormModalListingMarkSold !== null && typeof coEleFormModalListingMarkSold == "object" ){

	coEleFormModalListingMarkSold.addEventListener( 'submit', function () {

		if ( coListing.Modus == 'FOR SALE' ) {
			fListingMarkSold();
		}
		else if ( coListing.Modus == 'FOR RENT' ){
			fListingMarkTenanted();
		}

	});

}


if ( coEleModalListingInfoBtnCoMarketing !== null && typeof coEleModalListingInfoBtnCoMarketing == "object" ){

	coEleModalListingInfoBtnCoMarketing.addEventListener ( 'click', function () {

		fCoMarketingListing( this );

	});

}

/*
if ( coEleModalListingInfoBtnShare !== null && typeof coEleModalListingInfoBtnShare == "object" ){

	coEleModalListingInfoBtnShare.addEventListener ( 'click', function () {

		fShareListing();

	});

}
*/

function fHideListingInfo () {

	fIsAlive();


	if ( vObjTrackInvokerModalListingInfo ){

		if (
			vObjTrackInvokerModalListingInfo.indexOf( "=ModalProspectInfo" ) > -1
		){

			if ( coStatusSubscribe == true ) {

				let arObjInvoker = vObjTrackInvokerModalListingInfo.split( "=" );

				let arParamProspect = arObjInvoker[0].split( "|" );
			
				
				fShowProspectInfo ( arParamProspect[0], arParamProspect[1], arParamProspect[2] );

			}


			vObjTrackInvokerModalListingInfo = null;

		}

	}
	else if (
		vObjTrackInvokerModalListingInfo == 'WebsiteFeaturedListing'
	){

		const coModalListingInfoFooter = document.getElementById('ModalListingInfoFooter');
		coModalListingInfoFooter.classList.remove('d-none');

		vObjTrackInvokerModalListingInfo = null;

	}
	

	if ( coEleModalListingInfo !== null && typeof coEleModalListingInfo == "object" ){

		if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" ) 
			coEleModalListingInfoDivColEdit.classList.add('d-none');

		if ( coEleModalListingInfoDivColDelete !== null && typeof coEleModalListingInfoDivColDelete == "object" )
			coEleModalListingInfoDivColDelete.classList.add('d-none');

		if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" ) 
			coEleModalListingInfoDivColPublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" )
			coEleModalListingInfoDivColRepost.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" ) 
			coEleModalListingInfoDivColRepublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" )
			coEleModalListingInfoDivColUnpublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" )
			coEleModalListingInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" ) 
			coEleModalListingInfoDivColDeactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" ) 
			coEleModalListingInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" ) 
			coEleModalListingInfoDivColMarkBooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" )
			coEleModalListingInfoDivColMarkSold.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkTenanted !== null && typeof coEleModalListingInfoDivColMarkTenanted == "object" )
			coEleModalListingInfoDivColMarkTenanted.classList.add('d-none');

		if ( coEleModalListingInfoDivColCoMarketing !== null && typeof coEleModalListingInfoDivColCoMarketing == "object" )coEleModalListingInfoDivColCoMarketing.classList.add('d-none');

		if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" ) coEleModalListingInfoDivColShare.classList.add('d-none');

		if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.add('d-none');


		
		coListing.IdListing 			=	null;
		coListing.Ownership 			=	null;
		coListing.Modus 				=	null;
		coListing.Exclusive 			=	null;
		coListing.CoMarketingStatus 	=	null;

		coListing.coStatusDetail		=	null;
		coListing.StatusDetail 			= 	null;

		
		//coParaListingID.innerHTML = '';

		coEleModalListingInfoBody.innerHTML = '';


	}

}


async function fShowListingInfo ( vListingRegNo, vIdListing, pObjInvoker ) {

	fIsAlive();

//console.log( fGetMediaSize() );

	if ( coEleModalListingInfo !== null && typeof coEleModalListingInfo == "object" ){

		if ( coEleModalListingInfoBtnDownloadZipXS !== null && typeof coEleModalListingInfoBtnDownloadZipXS == "object" ) 
			coEleModalListingInfoBtnDownloadZipXS.classList.add('d-none');

		if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" )
			coEleModalListingInfoDivColEdit.classList.add('d-none');

		if ( coEleModalListingInfoDivColDelete !== null && typeof coEleModalListingInfoDivColDelete == "object" )
			coEleModalListingInfoDivColDelete.classList.add('d-none');

		if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" )
			coEleModalListingInfoDivColPublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" )
			coEleModalListingInfoDivColRepost.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" )
			coEleModalListingInfoDivColRepublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" )
			coEleModalListingInfoDivColUnpublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" )
			coEleModalListingInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" )
			coEleModalListingInfoDivColDeactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" )
			coEleModalListingInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" )
			coEleModalListingInfoDivColMarkBooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" )
			coEleModalListingInfoDivColMarkSold.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkTenanted !== null && typeof coEleModalListingInfoDivColMarkTenanted == "object" )
			coEleModalListingInfoDivColMarkTenanted.classList.add('d-none');

		if ( coEleModalListingInfoDivColCoMarketing !== null && typeof coEleModalListingInfoDivColCoMarketing == "object" )
			coEleModalListingInfoDivColCoMarketing.classList.add('d-none');

		if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" ) coEleModalListingInfoDivColShare.classList.add('d-none');

		if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.add('d-none');


		coListing.IdListing 			=	null;
		coListing.Ownership 			=	null;
		coListing.Modus 				=	null;
		coListing.Exclusive 			=	null;
		coListing.CoMarketingStatus 	=	null;

		coListing.coStatusDetail		=	null;
		coListing.StatusDetail 			= 	null;


		//coParaListingID.innerHTML = 'Listing ID: ' + vListingRegNo;
		//coParaListingID.innerHTML = 'View Listing';

		let vUrlListingInfo = gHost + "/listing/info?id=" + vIdListing;
		//let vUrlListingInfo = gHost + "/list/info?id=" + vIdListing;
//console.log(vUrlListingInfo);

		const coResponse = await fetch( vUrlListingInfo );
		//const coData = await coResponse.json();
		const coData = await coResponse.text();
//console.log(coData);

		if ( coData == "0" ){
			coEleModalListingInfoBody.innerHTML = htmlBodyListingResultNotFound;
		}
		else {
//console.log(coData);
			coEleModalListingInfoBody.innerHTML = coData;

			let oDivListingOwnership = document.getElementById('DivListingOwnership_' + vIdListing);
			
			let oDivListingModus = document.getElementById('DivListingModus_' + vIdListing);
			
			let oDivListingCoMarketingStatus = document.getElementById('DivListingCoMarketingStatus_' + vIdListing);
			
			let oDivListingExclusive = document.getElementById('DivListingExclusive_' + vIdListing);

			coListing.coStatusDetail = document.getElementById('DivListingStatusDetail_' + vIdListing);
			
			//let vListingOwnership = oDivListingOwnership.innerText.toString().trim().toUpperCase();
			//let vListingModus = oDivListingModus.innerText.trim().toUpperCase();
			//let vListingStatusDetail = oDivListingStatusDetail.innerText.trim().toUpperCase();
			//let vListingExclusive = oDivListingExclusive.innerText.trim().toUpperCase();
			//let vListingCoMarketingStatus = oDivListingCoMarketingStatus.innerText.toString().trim().toUpperCase();

			coListing.IdListing 			=	vIdListing;
			coListing.Ownership 			=	oDivListingOwnership.innerText.toString().trim().toUpperCase();
			coListing.Modus 				=	oDivListingModus.innerText.trim().toUpperCase();
			coListing.Exclusive 			=	oDivListingExclusive.innerText.trim().toUpperCase();
			coListing.CoMarketingStatus 	=	oDivListingCoMarketingStatus.innerText.toString().trim().toUpperCase();

			coListing.StatusDetail 			= 	coListing.coStatusDetail.innerText.trim().toUpperCase();

			

			if ( coListing.Ownership == 'YES' ){

				if ( coEleModalListingInfoBtnDownloadZipXS !== null && typeof coEleModalListingInfoBtnDownloadZipXS == "object" ) coEleModalListingInfoBtnDownloadZipXS.classList.remove('d-none');

				if ( coEleModalListingInfoHrefEdit !== null && typeof coEleModalListingInfoHrefEdit == "object" ) 
					coEleModalListingInfoHrefEdit.href = gHost + "/listing/update?id=" + coListing.IdListing;

//console.log( coEleModalListingInfoHrefEdit.href );

				if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" &&
						(
							coListing.StatusDetail != 'DEACTIVATED'		&&
							coListing.StatusDetail != 'BOOKED'			&&
							coListing.StatusDetail != 'SOLD'
						)
					){

					coEleModalListingInfoDivColEdit.classList.remove('d-none');

				}

				
				if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" &&
						(
							coListing.StatusDetail == 'DRAFT'
						)
					) {

					coEleModalListingInfoDivColDelete.classList.remove('d-none');
					coEleModalListingInfoDivColPublish.classList.remove('d-none');

				}
				
				if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" &&
						(
							coListing.StatusDetail == 'EXPIRED'		||
							coListing.StatusDetail == 'UNPUBLISHED'	||
							coListing.StatusDetail == 'REACTIVATED'	||
							coListing.StatusDetail == 'UNBOOKED'
						)
					) {
					
					coEleModalListingInfoDivColRepublish.classList.remove('d-none');

				}
				
				if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" &&
						(
							coListing.StatusDetail == 'PUBLISHED'		||
							coListing.StatusDetail == 'REPUBLISHED'
						)
					) {

					coEleModalListingInfoDivColUnpublish.classList.remove('d-none')

				}
				
				if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" &&
						(
							coListing.StatusDetail == 'PUBLISHED'		||
							coListing.StatusDetail == 'REPUBLISHED'
						)
					) {

					coEleModalListingInfoDivColRepost.classList.remove('d-none');

				}
				
				if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" &&
						coListing.StatusDetail == 'DEACTIVATED'
					) {

					coEleModalListingInfoDivColReactivate.classList.remove('d-none');

				}
				
				if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" &&
						(
							coListing.StatusDetail == 'EXPIRED'		||
							coListing.StatusDetail == 'UNPUBLISHED'	||
							coListing.StatusDetail == 'REACTIVATED'	||
							coListing.StatusDetail == 'UNBOOKED'
						)
					) {

					coEleModalListingInfoDivColDeactivate.classList.remove('d-none');

				}
				
				if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" &&
						(
							coListing.StatusDetail == 'BOOKED'
						)
					) {

					coEleModalListingInfoDivColMarkUnbooked.classList.remove('d-none');

				}
				
				if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" &&
						(
							coListing.StatusDetail == 'PUBLISHED'	||
							coListing.StatusDetail == 'EXPIRED'		||
							coListing.StatusDetail == 'REPUBLISHED'	||
							coListing.StatusDetail == 'UNPUBLISHED'	||
							coListing.StatusDetail == 'REACTIVATED'	||
							coListing.StatusDetail == 'UNBOOKED'
						)
					) {

					coEleModalListingInfoDivColMarkBooked.classList.remove('d-none');

				}
				
				if ( coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" &&
						coListing.StatusDetail == 'BOOKED'	&&
						coListing.Modus == 'FOR SALE'
					) {

					coEleModalListingInfoDivColMarkSold.classList.remove('d-none');

				}
				
				if ( coEleModalListingInfoDivColMarkTenanted !== null && typeof coEleModalListingInfoDivColMarkTenanted == "object" &&
						coListing.StatusDetail == 'BOOKED'	&&
						coListing.Modus == 'FOR RENT'
					) {

					coEleModalListingInfoDivColMarkTenanted.classList.remove('d-none');

				}

				if ( 
					coEleModalListingInfoDivColShare !== null
					&&
					typeof coEleModalListingInfoDivColShare == "object"
					&&
					(
						coListing.StatusDetail == 'PUBLISHED'		||
						coListing.StatusDetail == 'REPUBLISHED'
					)
				){

					coEleModalListingInfoDivColShare.classList.remove('d-none');

				}

				if ( 
					coModalListingInfoDivColShareMulti !== null
					&&
					typeof coModalListingInfoDivColShareMulti == "object"
					&&
					(
						coListing.StatusDetail == 'PUBLISHED'		||
						coListing.StatusDetail == 'REPUBLISHED'
					)
				){

					coModalListingInfoDivColShareMulti.classList.remove('d-none');

				}


			}
			else {

				if (
					coListing.StatusDetail == 'PUBLISHED'		||
					coListing.StatusDetail == 'REPUBLISHED'
					){

					if ( coEleModalListingInfoBtnDownloadZipXS !== null && typeof coEleModalListingInfoBtnDownloadZipXS == "object" ) coEleModalListingInfoBtnDownloadZipXS.classList.remove('d-none');

					if ( coEleModalListingInfoBtnCoMarketing !== null && typeof coEleModalListingInfoBtnCoMarketing == "object" ){
					
						if ( coListing.CoMarketingStatus == 'Y' ){

							coEleModalListingInfoBtnCoMarketing.innerHTML = '<span class="fw-bold" style="color: #FF0000;"><i class="fas fa-heart" style="width: 1.0rem;"></i><span class="d-none d-sm-inline">&nbsp; Co-Marketing</span></span>';

						}
						else {

							coEleModalListingInfoBtnCoMarketing.innerHTML = '<i class="far fa-heart" style="width: 1.0rem;"></i><span class="d-none d-sm-inline">&nbsp; Co-Marketing</span>';

						}
					}

					if ( coEleModalListingInfoDivColCoMarketing !== null && typeof coEleModalListingInfoDivColCoMarketing == "object" )
						coEleModalListingInfoDivColCoMarketing.classList.remove('d-none');

					if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" ) coEleModalListingInfoDivColShare.classList.remove('d-none');

					if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.remove('d-none');
					

				}

			
			}


		}

		if (
			pObjInvoker
		){

			if (
				pObjInvoker.indexOf( "=ModalProspectInfo" ) > -1
			){

				vObjTrackInvokerModalListingInfo = pObjInvoker;

			}
			else if (
				pObjInvoker == 'WebsiteFeaturedListing'
			){

				const coModalListingInfoFooter = document.getElementById('ModalListingInfoFooter');
				coModalListingInfoFooter.classList.add('d-none');

				vObjTrackInvokerModalListingInfo = pObjInvoker;

			}

		}

	
		coModalListingInfo.show();

	}

}

/*****************************************************************/


async function fCoMarketingListing ( oBtnCoMarketing, vIdListing ) {

	fIsAlive();
	

	if ( !vIdListing ) vIdListing = coListing.IdListing;
	
//console.log(' fCoMarketingListing ( ' + vIdListing + ' ) ');

	let oBodyListingCardResultIconCoMarketing = document.getElementById( 'BodyListingCardResultIconCoMarketing_'+ vIdListing );

	let oListingInfoModalIconCoMarketing = document.getElementById( 'ListingInfoModalIconCoMarketing_'+ vIdListing );

	let oBodyListingCardResultBtnCoMarketing = document.getElementById( 'BodyListingCardResultBtnCoMarketing_'+ vIdListing );

	let oModalDivListingCoMarketingStatus = document.getElementById('DivListingCoMarketingStatus_' + vIdListing);

	
//console.log( oBtnCoMarketing.innerHTML );

	if (
		oBtnCoMarketing.innerHTML == '<i class="far fa-heart" style="width: 1.0rem;"></i><span class="d-none d-sm-inline">&nbsp; Co-Marketing</span>'
		||
		oBtnCoMarketing.innerHTML == '<i class="far fa-heart"></i>&nbsp; Co-Marketing'
		){


		let vUrlListingComarketRequest = gHost + "/listing/comarketing/request?id=" + vIdListing;
//console.log(vUrlListingComarketRequest);

		const coResponse = await fetch( vUrlListingComarketRequest )

		const coData = await coResponse.text();
console.log( coData.toString().trim() );

		if ( coData.toString().trim() == "success" ){
		
			if ( oBodyListingCardResultBtnCoMarketing !== null && typeof oBodyListingCardResultBtnCoMarketing == "object"
				&&
				oBtnCoMarketing.id == oBodyListingCardResultBtnCoMarketing.id ){
				
				oBodyListingCardResultBtnCoMarketing.innerHTML = '<span class="fw-bold" style="color: #ff0000;"><i class="fas fa-heart"></i>&nbsp; Co-Marketing</span>';

			}

			if (
				coEleModalListingInfoBtnCoMarketing !== null && typeof coEleModalListingInfoBtnCoMarketing == "object"
				&&
				oBtnCoMarketing.id == coEleModalListingInfoBtnCoMarketing.id 
				){

				coEleModalListingInfoBtnCoMarketing.innerHTML = '<span class="fw-bold" style="color: #FF0000;"><i class="fas fa-heart" style="width: 1.0rem;"></i><span class="d-none d-sm-inline">&nbsp; Co-Marketing</span></span>';

				if ( oBodyListingCardResultBtnCoMarketing !== null && typeof oBodyListingCardResultBtnCoMarketing == "object" )
					oBodyListingCardResultBtnCoMarketing.innerHTML = '<span class="fw-bold" style="color: #ff0000;"><i class="fas fa-heart"></i>&nbsp; Co-Marketing</span>';

			}

			if ( oBodyListingCardResultIconCoMarketing !== null && typeof oBodyListingCardResultIconCoMarketing == "object" ) oBodyListingCardResultIconCoMarketing.classList.remove('d-none');

			if ( oListingInfoModalIconCoMarketing !== null && typeof oListingInfoModalIconCoMarketing == "object" )
				oListingInfoModalIconCoMarketing.classList.remove('d-none');

			if ( oModalDivListingCoMarketingStatus !== null && typeof oModalDivListingCoMarketingStatus == "object" )
				oModalDivListingCoMarketingStatus.innerText = 'Y';

			coListing.CoMarketingStatus = 'Y';

		}

	}
	else if (
		oBtnCoMarketing.innerHTML == '<span class="fw-bold" style="color: #FF0000;"><i class="fas fa-heart" style="width: 1.0rem;"></i><span class="d-none d-sm-inline">&nbsp; Co-Marketing</span></span>'
		||
		oBtnCoMarketing.innerHTML == '<span class="fw-bold" style="color: #ff0000;"><i class="fas fa-heart"></i>&nbsp; Co-Marketing</span>'
		){


		let vUrlListingComarketCancel = gHost + "/listing/comarketing/cancel?id=" + vIdListing;
//console.log(vUrlListingComarketRequest);

		const coResponse = await fetch( vUrlListingComarketCancel )
		
		const coData = await coResponse.text();
//console.log( coData.toString().trim() );

		if ( coData.toString().trim() == "success" ){
		
			if ( oBodyListingCardResultBtnCoMarketing !== null && typeof oBodyListingCardResultBtnCoMarketing == "object"
				&&
				oBtnCoMarketing.id == oBodyListingCardResultBtnCoMarketing.id ){
				
				oBodyListingCardResultBtnCoMarketing.innerHTML = '<i class="far fa-heart"></i>&nbsp; Co-Marketing';

			}

			if (
				coEleModalListingInfoBtnCoMarketing !== null && typeof coEleModalListingInfoBtnCoMarketing == "object"
				&&
				oBtnCoMarketing.id == coEleModalListingInfoBtnCoMarketing.id 
				){

				coEleModalListingInfoBtnCoMarketing.innerHTML = '<i class="far fa-heart" style="width: 1.0rem;"></i><span class="d-none d-sm-inline">&nbsp; Co-Marketing</span>';

				if ( oBodyListingCardResultBtnCoMarketing !== null && typeof oBodyListingCardResultBtnCoMarketing == "object" )
					oBodyListingCardResultBtnCoMarketing.innerHTML = '<i class="far fa-heart"></i>&nbsp; Co-Marketing';

			}
		
			if ( oBodyListingCardResultIconCoMarketing !== null && typeof oBodyListingCardResultIconCoMarketing == "object" ) oBodyListingCardResultIconCoMarketing.classList.add('d-none');

			if ( oListingInfoModalIconCoMarketing !== null && typeof oListingInfoModalIconCoMarketing == "object" ) oListingInfoModalIconCoMarketing.classList.add('d-none');

			if ( oModalDivListingCoMarketingStatus !== null && typeof oModalDivListingCoMarketingStatus == "object" ) oModalDivListingCoMarketingStatus.innerText = 'N';

			coListing.CoMarketingStatus = 'N';

		}


	}
	
}

async function fListingDelete(){

	fIsAlive();
	

	let vUrlListingDelete = gHost + "/listing/delete?id=" + coListing.IdListing;
//console.log(vUrlListingDelete);

	const coResponse = await fetch( vUrlListingDelete )

	const coData = await coResponse.text();
//console.log( coData.toString().trim() );

	if ( coData.toString().trim() == "success" ){

		let oDivProfileListing = document.getElementById( 'DivProfileListing_' + coListing.IdListing );

		if ( oDivProfileListing !== null && typeof oDivProfileListing == "object" ){

			oDivProfileListing.remove();

		}
			
		coModalListingInfo.hide();

	}
	else {

	}

}

async function fListingPublish () {

	fIsAlive();
	

	let vUrlListingPublish = gHost + "/listing/publish?id=" + coListing.IdListing;
//console.log(vUrlListingPublish);

	const coResponse = await fetch( vUrlListingPublish )

	const coData = await coResponse.text();
//console.log( coData.toString().trim() );

	if ( coData.toString().trim() == "success" ){

		let oListingInfoModalBadgePublished = document.getElementById('ListingInfoModalBadgePublished_' + coListing.IdListing);
		
		if ( oListingInfoModalBadgePublished !== null && typeof oListingInfoModalBadgePublished == "object" ) oListingInfoModalBadgePublished.classList.remove('d-none');

		
		let oBodyListingCardResultBadgePublished = document.getElementById('BodyListingCardResultBadgePublished_' + coListing.IdListing);
		
		if ( oBodyListingCardResultBadgePublished !== null && typeof oBodyListingCardResultBadgePublished == "object" ) oBodyListingCardResultBadgePublished.classList.remove('d-none');

		
		let oListingInfoModalRibbonDraft = document.getElementById('ListingInfoModalRibbonDraft_' + coListing.IdListing);


		if ( oListingInfoModalRibbonDraft !== null && typeof oListingInfoModalRibbonDraft == "object" ) oListingInfoModalRibbonDraft.classList.add('d-none');
		
		
		let oListingInfoModalRibbonUnavailable = document.getElementById('ListingInfoModalRibbonUnavailable_' + coListing.IdListing);


		if ( oListingInfoModalRibbonUnavailable !== null && typeof oListingInfoModalRibbonUnavailable == "object" ) oListingInfoModalRibbonUnavailable.classList.add('d-none');
		
		
		let oBodyListingCardResultRibbonDraft = document.getElementById('BodyListingCardResultRibbonDraft_' + coListing.IdListing);

		if ( oBodyListingCardResultRibbonDraft !== null && typeof oBodyListingCardResultRibbonDraft == "object" ) oBodyListingCardResultRibbonDraft.classList.add('d-none');

		
		let oBodyListingCardResultRibbonUnavailable = document.getElementById('BodyListingCardResultRibbonUnavailable_' + coListing.IdListing);

		if ( oBodyListingCardResultRibbonUnavailable !== null && typeof oBodyListingCardResultRibbonUnavailable == "object" ) oBodyListingCardResultRibbonUnavailable.classList.add('d-none');

		
		if ( coListing.Exclusive == 'Y' ){

			let oListingInfoModalBadgeExclusive = document.getElementById('ListingInfoModalBadgeExclusive_' + coListing.IdListing);

			if ( oListingInfoModalBadgeExclusive !== null && typeof oListingInfoModalBadgeExclusive == "object" ) oListingInfoModalBadgeExclusive.classList.remove('d-none');


			let oBodyListingCardResultRibbonExclusive = document.getElementById('BodyListingCardResultRibbonExclusive_' + coListing.IdListing);

			if ( oBodyListingCardResultRibbonExclusive !== null && typeof oBodyListingCardResultRibbonExclusive == "object" ) oBodyListingCardResultRibbonExclusive.classList.remove('d-none');

		}


		if (
			coListing.StatusDetail == 'DRAFT'
		){

			let oListingInfoModalBadgeNewListing = document.getElementById('ListingInfoModalBadgeNewListing_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeNewListing !== null && typeof oListingInfoModalBadgeNewListing == "object" ) oListingInfoModalBadgeNewListing.classList.add('d-none');

			
			let oBodyListingCardResultBadgeNewListing = document.getElementById('BodyListingCardResultBadgeNewListing_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeNewListing !== null && typeof oBodyListingCardResultBadgeNewListing == "object" ) oBodyListingCardResultBadgeNewListing.classList.add('d-none');

		}

		if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" )
			coEleModalListingInfoDivColEdit.classList.remove('d-none');

		if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" )
			coEleModalListingInfoDivColPublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" )
			coEleModalListingInfoDivColRepost.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" )
			coEleModalListingInfoDivColRepublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" )
			coEleModalListingInfoDivColUnpublish.classList.remove('d-none');

		if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" )
			coEleModalListingInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" )
			coEleModalListingInfoDivColDeactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" )
			coEleModalListingInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" )
			coEleModalListingInfoDivColMarkBooked.classList.remove('d-none');

		if ( coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" )
			coEleModalListingInfoDivColMarkSold.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkTenanted !== null && typeof coEleModalListingInfoDivColMarkTenanted == "object" )
			coEleModalListingInfoDivColMarkTenanted.classList.add('d-none');

		if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" )
			coEleModalListingInfoDivColShare.classList.remove('d-none');

		if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.remove('d-none');


		coListing.coStatusDetail.innerText = 'PUBLISHED';
		coListing.StatusDetail = 	coListing.coStatusDetail.innerText.trim().toUpperCase();

	}

}

async function fListingRepost(){

	fIsAlive();
	

	let oDivListingRepostDateTime = document.getElementById('DivListingRepostDateTime_' + coListing.IdListing);

//console.log( oDivListingRepostDateTime );
//console.log( oDivListingRepostDateTime.innerHTML );


	
	/*
	if ( oDivListingRepostDateTime.innerHTML != '' ){

		let oRepostDateTime = new Date( parseInt( oDivListingRepostDateTime.innerHTML, 10 ) );
//console.log( oRepostDateTime );

		let oNowDateTime = new Date();
//console.log( oNowDateTime );

		let vDiffTimeHours = ( oNowDateTime.getTime() - oRepostDateTime.getTime() ) / 3600000;
//console.log( vDiffTimeHours );
		
		if ( vDiffTimeHours <= 24 ){

			coModalListingInfo.hide();

			//coEleModalLaskeaOnlyInPremiumMessage.innerHTML = 'Repost Listing are only allowed once for every 24 hours, except for Laskea Premium subscribers.';

			coEleModalLaskeaOnlyInPremiumMessage.innerHTML = '<p class="fw-semibold text-center text-success mt-0 mb-0">Repost Listing are limited one time for every 24 hours.</p><p class="fw-semibold text-center text-success mt-2 mb-0">Subscribe Laskea Premium to remove this limit.</p>';

			const coModalLaskeaOnlyInPremium = new bootstrap.Modal( coEleModalLaskeaOnlyInPremium );
			coModalLaskeaOnlyInPremium.show();

			return;

		}

	}
	*/

	if ( oDivListingRepostDateTime.innerHTML == 'PREMIUM' ){

		let vUrlListingRepost = gHost + "/listing/repost?id=" + coListing.IdListing;
//console.log(vUrlListingRepost);

		const coResponse = await fetch( vUrlListingRepost )

		const coData = await coResponse.text();
//console.log( coData.toString().trim() );

		const coJson = JSON.parse( coData.toString().trim() );
//console.log( coJson );


		if ( coJson.status == "success" ){

			//coModalListingInfo.hide();

			oDivListingRepostDateTime.innerHTML = coJson.repost_js_timestamp;

			let oParaListingInfoPublishDateDesktop = document.getElementById('ParaListingInfoPublishDateDesktop');

			if ( oParaListingInfoPublishDateDesktop !== null && typeof oParaListingInfoPublishDateDesktop == "object" ){

//console.log( oParaListingInfoPublishDateDesktop );
//console.log( oParaListingInfoPublishDateDesktop.innerHTML );

				oParaListingInfoPublishDateDesktop.innerHTML = coJson.publish_dt;

//console.log( oParaListingInfoPublishDateDesktop.innerHTML );

			}

			
			let oParaListingInfoPublishDateMobile = document.getElementById('ParaListingInfoPublishDateMobile');

			if ( oParaListingInfoPublishDateMobile !== null && typeof oParaListingInfoPublishDateMobile == "object" ){

//console.log( oParaListingInfoPublishDateMobile );
//console.log( oParaListingInfoPublishDateMobile.innerHTML );

				oParaListingInfoPublishDateMobile.innerHTML = coJson.publish_dt;

//console.log( oParaListingInfoPublishDateMobile.innerHTML );

			}

			
			let oDivProfileListing = document.getElementById( 'DivProfileListing_' + coListing.IdListing );

			if ( oDivProfileListing !== null && typeof oDivProfileListing == "object" ){

				let oDivProfileListingCardFooter = oDivProfileListing.querySelector('.card-footer');

				oDivProfileListingCardFooter.innerHTML = coJson.publish_dt;

//console.log( oDivProfileListingCardFooter );

//console.log( oDivProfileListingCardFooter.innerHTML );

			}

			alert('Listing Reposted.')

		}
		else {

		}

	}
	else {

		coModalListingInfo.hide();

		const coModalLaskeaOnlyInPremium = new bootstrap.Modal( coEleModalLaskeaOnlyInPremium );
			coModalLaskeaOnlyInPremium.show();

		return;

	}

}

async function fListingRepublish () {

	fIsAlive();
	

	let vUrlListingRepublish = gHost + "/listing/republish?id=" + coListing.IdListing;
//console.log(vUrlListingRepublish);

	const coResponse = await fetch( vUrlListingRepublish )

	const coData = await coResponse.text();
//console.log( coData.toString().trim() );

	if ( coData.toString().trim() == "success" ){

		let oListingInfoModalBadgeRepublished = document.getElementById('ListingInfoModalBadgeRepublished_' + coListing.IdListing);
		
		if ( oListingInfoModalBadgeRepublished !== null && typeof oListingInfoModalBadgeRepublished == "object" ) 
			oListingInfoModalBadgeRepublished.classList.remove('d-none');

		
		let oBodyListingCardResultBadgeRepublished = document.getElementById('BodyListingCardResultBadgeRepublished_' + coListing.IdListing);
		
		if ( oBodyListingCardResultBadgeRepublished !== null && typeof oBodyListingCardResultBadgeRepublished == "object" ) oBodyListingCardResultBadgeRepublished.classList.remove('d-none');

		
		let oListingInfoModalRibbonUnavailable = document.getElementById('ListingInfoModalRibbonUnavailable_' + coListing.IdListing);


		if ( oListingInfoModalRibbonUnavailable !== null && typeof oListingInfoModalRibbonUnavailable == "object" ) oListingInfoModalRibbonUnavailable.classList.add('d-none');

		
		let oBodyListingCardResultRibbonUnavailable = document.getElementById('BodyListingCardResultRibbonUnavailable_' + coListing.IdListing);

		if ( oBodyListingCardResultRibbonUnavailable !== null && typeof oBodyListingCardResultRibbonUnavailable == "object" ) oBodyListingCardResultRibbonUnavailable.classList.add('d-none');

		
		if ( coListing.Exclusive == 'Y' ){

			let oListingInfoModalBadgeExclusive = document.getElementById('ListingInfoModalBadgeExclusive_' + coListing.IdListing);

			if ( oListingInfoModalBadgeExclusive !== null && typeof oListingInfoModalBadgeExclusive == "object" ) oListingInfoModalBadgeExclusive.classList.remove('d-none');


			let oBodyListingCardResultRibbonExclusive = document.getElementById('BodyListingCardResultRibbonExclusive_' + coListing.IdListing);

			if ( oBodyListingCardResultRibbonExclusive !== null && typeof oBodyListingCardResultRibbonExclusive == "object" ) oBodyListingCardResultRibbonExclusive.classList.remove('d-none');

		}

		
		if (
			coListing.StatusDetail == 'EXPIRED'
			){

			let oListingInfoModalBadgeExpired = document.getElementById('ListingInfoModalBadgeExpired_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeExpired !== null && typeof oListingInfoModalBadgeExpired == "object" ) oListingInfoModalBadgeExpired.classList.add('d-none');

			
			let oBodyListingCardResultBadgeExpired = document.getElementById('BodyListingCardResultBadgeExpired_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeExpired !== null && typeof oBodyListingCardResultBadgeExpired == "object" ) oBodyListingCardResultBadgeExpired.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'UNPUBLISHED'
			){

			let oListingInfoModalBadgeUnpublished = document.getElementById('ListingInfoModalBadgeUnpublished_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeUnpublished !== null && typeof oListingInfoModalBadgeUnpublished == "object" ) oListingInfoModalBadgeUnpublished.classList.add('d-none');

			
			let oBodyListingCardResultBadgeUnpublished = document.getElementById('BodyListingCardResultBadgeUnpublished_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeUnpublished !== null && typeof oBodyListingCardResultBadgeUnpublished == "object" ) oBodyListingCardResultBadgeUnpublished.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'REACTIVATED'
			){

			let oListingInfoModalBadgeReactivated = document.getElementById('ListingInfoModalBadgeReactivated_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeReactivated !== null && typeof oListingInfoModalBadgeReactivated == "object" ) oListingInfoModalBadgeReactivated.classList.add('d-none');

			
			let oBodyListingCardResultBadgeReactivated = document.getElementById('BodyListingCardResultBadgeReactivated_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeReactivated !== null && typeof oBodyListingCardResultBadgeReactivated == "object" ) oBodyListingCardResultBadgeReactivated.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'UNBOOKED'
			){

			let oListingInfoModalBadgeUnbooked = document.getElementById('ListingInfoModalBadgeUnbooked_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeUnbooked !== null && typeof oListingInfoModalBadgeUnbooked == "object" ) oListingInfoModalBadgeUnbooked.classList.add('d-none');

			
			let oBodyListingCardResultBadgeUnbooked = document.getElementById('BodyListingCardResultBadgeUnbooked_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeUnbooked !== null && typeof oBodyListingCardResultBadgeUnbooked == "object" ) oBodyListingCardResultBadgeUnbooked.classList.add('d-none');

		}


		if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" )
			coEleModalListingInfoDivColEdit.classList.remove('d-none');

		if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" )
			coEleModalListingInfoDivColPublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" )
			coEleModalListingInfoDivColRepost.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" )
			coEleModalListingInfoDivColRepublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" )
			coEleModalListingInfoDivColUnpublish.classList.remove('d-none');

		if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" )
			coEleModalListingInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" )
			coEleModalListingInfoDivColDeactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" )
			coEleModalListingInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" )
			coEleModalListingInfoDivColMarkBooked.classList.remove('d-none');

		if ( coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" )
			coEleModalListingInfoDivColMarkSold.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkTenanted !== null && typeof coEleModalListingInfoDivColMarkTenanted == "object" )
			coEleModalListingInfoDivColMarkTenanted.classList.add('d-none');

		if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" )
			coEleModalListingInfoDivColShare.classList.remove('d-none');

		if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.remove('d-none');
		

		coListing.coStatusDetail.innerText = 'REPUBLISHED';
		coListing.StatusDetail = 	coListing.coStatusDetail.innerText.trim().toUpperCase();

	}
	
}

async function fListingUnpublish () {

	fIsAlive();
	

	let vUrlListingUnpublish = gHost + "/listing/unpublish?id=" + coListing.IdListing;
//console.log(vUrlListingUnpublish);

	const coResponse = await fetch( vUrlListingUnpublish )

	const coData = await coResponse.text();
//console.log( coData.toString().trim() );

	if ( coData.toString().trim() == "success" ){

		let oListingInfoModalBadgeUnpublished = document.getElementById('ListingInfoModalBadgeUnpublished_' + coListing.IdListing);
		
		if ( oListingInfoModalBadgeUnpublished !== null && typeof oListingInfoModalBadgeUnpublished == "object" ) oListingInfoModalBadgeUnpublished.classList.remove('d-none');

		
		let oBodyListingCardResultBadgeUnpublished = document.getElementById('BodyListingCardResultBadgeUnpublished_' + coListing.IdListing);
		
		if ( oBodyListingCardResultBadgeUnpublished !== null && typeof oBodyListingCardResultBadgeUnpublished == "object" ) oBodyListingCardResultBadgeUnpublished.classList.remove('d-none');

		
		let oListingInfoModalRibbonUnavailable = document.getElementById('ListingInfoModalRibbonUnavailable_' + coListing.IdListing);


		if ( oListingInfoModalRibbonUnavailable !== null && typeof oListingInfoModalRibbonUnavailable == "object" ) oListingInfoModalRibbonUnavailable.classList.remove('d-none');

		
		let oBodyListingCardResultRibbonUnavailable = document.getElementById('BodyListingCardResultRibbonUnavailable_' + coListing.IdListing);

		if ( oBodyListingCardResultRibbonUnavailable !== null && typeof oBodyListingCardResultRibbonUnavailable == "object" ) oBodyListingCardResultRibbonUnavailable.classList.remove('d-none');

		
		if ( coListing.Exclusive == 'Y' ){

			let oListingInfoModalBadgeExclusive = document.getElementById('ListingInfoModalBadgeExclusive_' + coListing.IdListing);

			if ( oListingInfoModalBadgeExclusive !== null && typeof oListingInfoModalBadgeExclusive == "object" ) oListingInfoModalBadgeExclusive.classList.add('d-none');


			let oBodyListingCardResultRibbonExclusive = document.getElementById('BodyListingCardResultRibbonExclusive_' + coListing.IdListing);

			if ( oBodyListingCardResultRibbonExclusive !== null && typeof oBodyListingCardResultRibbonExclusive == "object" ) oBodyListingCardResultRibbonExclusive.classList.add('d-none');

		}
		

		if (
			coListing.StatusDetail == 'PUBLISHED'
			){

			let oListingInfoModalBadgePublished = document.getElementById('ListingInfoModalBadgePublished_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgePublished !== null && typeof oListingInfoModalBadgePublished == "object" ) oListingInfoModalBadgePublished.classList.add('d-none');

			
			let oBodyListingCardResultBadgePublished = document.getElementById('BodyListingCardResultBadgePublished_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgePublished !== null && typeof oBodyListingCardResultBadgePublished == "object" ) oBodyListingCardResultBadgePublished.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'REPUBLISHED'
			){

			let oListingInfoModalBadgeRepublished = document.getElementById('ListingInfoModalBadgeRepublished_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeRepublished !== null && typeof oListingInfoModalBadgeRepublished == "object" ) oListingInfoModalBadgeRepublished.classList.add('d-none');

			
			let oBodyListingCardResultBadgeRepublished = document.getElementById('BodyListingCardResultBadgeRepublished_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeRepublished !== null && typeof oBodyListingCardResultBadgeRepublished == "object" ) oBodyListingCardResultBadgeRepublished.classList.add('d-none');

		}


		if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" )
			coEleModalListingInfoDivColEdit.classList.remove('d-none');

		if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" )
			coEleModalListingInfoDivColPublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" )
			coEleModalListingInfoDivColRepost.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" )
			coEleModalListingInfoDivColRepublish.classList.remove('d-none');

		if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" )
			coEleModalListingInfoDivColUnpublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" )
			coEleModalListingInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" )
			coEleModalListingInfoDivColDeactivate.classList.remove('d-none');

		if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" )
			coEleModalListingInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" )
			coEleModalListingInfoDivColMarkBooked.classList.remove('d-none');

		if ( coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" )
			coEleModalListingInfoDivColMarkSold.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkTenanted !== null && typeof coEleModalListingInfoDivColMarkTenanted == "object" )
			coEleModalListingInfoDivColMarkTenanted.classList.add('d-none');

		if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" )
			coEleModalListingInfoDivColShare.classList.add('d-none');

		if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.add('d-none');


		coListing.coStatusDetail.innerText = 'UNPUBLISHED';
		coListing.StatusDetail = 	coListing.coStatusDetail.innerText.trim().toUpperCase();
	}
	
}

async function fListingReactivate () {

	fIsAlive();
	

	let vUrlListingReactivate = gHost + "/listing/reactivate?id=" + coListing.IdListing;
//console.log(vUrlListingReactivate);

	const coResponse = await fetch( vUrlListingReactivate )

	const coData = await coResponse.text();
//console.log( coData.toString().trim() );

	if ( coData.toString().trim() == "success" ){

		let oListingInfoModalBadgeReactivated = document.getElementById('ListingInfoModalBadgeReactivated_' + coListing.IdListing);
		
		if ( oListingInfoModalBadgeReactivated !== null && typeof oListingInfoModalBadgeReactivated == "object" ) oListingInfoModalBadgeReactivated.classList.remove('d-none');

		
		let oBodyListingCardResultBadgeReactivated = document.getElementById('BodyListingCardResultBadgeReactivated_' + coListing.IdListing);
		
		if ( oBodyListingCardResultBadgeReactivated !== null && typeof oBodyListingCardResultBadgeReactivated == "object" ) oBodyListingCardResultBadgeReactivated.classList.remove('d-none');

		
		let oListingInfoModalRibbonUnavailable = document.getElementById('ListingInfoModalRibbonUnavailable_' + coListing.IdListing);


		if ( oListingInfoModalRibbonUnavailable !== null && typeof oListingInfoModalRibbonUnavailable == "object" ) oListingInfoModalRibbonUnavailable.classList.remove('d-none');

		
		let oBodyListingCardResultRibbonUnavailable = document.getElementById('BodyListingCardResultRibbonUnavailable_' + coListing.IdListing);

		if ( oBodyListingCardResultRibbonUnavailable !== null && typeof oBodyListingCardResultRibbonUnavailable == "object" ) oBodyListingCardResultRibbonUnavailable.classList.remove('d-none');

		
		if ( coListing.Exclusive == 'Y' ){

			let oListingInfoModalBadgeExclusive = document.getElementById('ListingInfoModalBadgeExclusive_' + coListing.IdListing);

			if ( oListingInfoModalBadgeExclusive !== null && typeof oListingInfoModalBadgeExclusive == "object" ) oListingInfoModalBadgeExclusive.classList.add('d-none');


			let oBodyListingCardResultRibbonExclusive = document.getElementById('BodyListingCardResultRibbonExclusive_' + coListing.IdListing);

			if ( oBodyListingCardResultRibbonExclusive !== null && typeof oBodyListingCardResultRibbonExclusive == "object" ) oBodyListingCardResultRibbonExclusive.classList.add('d-none');

		}

		
		if (
			coListing.StatusDetail == 'DEACTIVATED'
			){

			let oListingInfoModalBadgeDeactivated = document.getElementById('ListingInfoModalBadgeDeactivated_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeDeactivated !== null && typeof oListingInfoModalBadgeDeactivated == "object" ) oListingInfoModalBadgeDeactivated.classList.add('d-none');

			
			let oBodyListingCardResultBadgeDeactivated = document.getElementById('BodyListingCardResultBadgeDeactivated_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeDeactivated !== null && typeof oBodyListingCardResultBadgeDeactivated == "object" ) oBodyListingCardResultBadgeDeactivated.classList.add('d-none');

		}

		if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" )
			coEleModalListingInfoDivColEdit.classList.remove('d-none');

		if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" )
			coEleModalListingInfoDivColPublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" )
			coEleModalListingInfoDivColRepost.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" )
			coEleModalListingInfoDivColRepublish.classList.remove('d-none');

		if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" )
			coEleModalListingInfoDivColUnpublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" )
			coEleModalListingInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" )
			coEleModalListingInfoDivColDeactivate.classList.remove('d-none');

		if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" )
			coEleModalListingInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" )
			coEleModalListingInfoDivColMarkBooked.classList.remove('d-none');

		if ( coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" )
			coEleModalListingInfoDivColMarkSold.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkTenanted !== null && typeof coEleModalListingInfoDivColMarkTenanted == "object" )
			coEleModalListingInfoDivColMarkTenanted.classList.add('d-none');

		if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" )
			coEleModalListingInfoDivColShare.classList.add('d-none');

		if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.add('d-none');

		
		coListing.coStatusDetail.innerText = 'REACTIVATED';
		coListing.StatusDetail = 	coListing.coStatusDetail.innerText.trim().toUpperCase();

	}
	
}

async function fListingDeactivate () {

	fIsAlive();
	

	let vUrlListingDeactivate = gHost + "/listing/deactivate?id=" + coListing.IdListing;
//console.log(vUrlListingDeactivate);

	const coResponse = await fetch( vUrlListingDeactivate )

	const coData = await coResponse.text();
//console.log( coData.toString().trim() );

	if ( coData.toString().trim() == "success" ){

		let oListingInfoModalBadgeDeactivated = document.getElementById('ListingInfoModalBadgeDeactivated_' + coListing.IdListing);
		
		if ( oListingInfoModalBadgeDeactivated !== null && typeof oListingInfoModalBadgeDeactivated == "object" ) oListingInfoModalBadgeDeactivated.classList.remove('d-none');

		
		let oBodyListingCardResultBadgeDeactivated = document.getElementById('BodyListingCardResultBadgeDeactivated_' + coListing.IdListing);
		
		if ( oBodyListingCardResultBadgeDeactivated !== null && typeof oBodyListingCardResultBadgeDeactivated == "object" ) oBodyListingCardResultBadgeDeactivated.classList.remove('d-none');

		
		let oListingInfoModalRibbonUnavailable = document.getElementById('ListingInfoModalRibbonUnavailable_' + coListing.IdListing);


		if ( oListingInfoModalRibbonUnavailable !== null && typeof oListingInfoModalRibbonUnavailable == "object" ) oListingInfoModalRibbonUnavailable.classList.remove('d-none');

		
		let oBodyListingCardResultRibbonUnavailable = document.getElementById('BodyListingCardResultRibbonUnavailable_' + coListing.IdListing);

		if ( oBodyListingCardResultRibbonUnavailable !== null && typeof oBodyListingCardResultRibbonUnavailable == "object" ) oBodyListingCardResultRibbonUnavailable.classList.remove('d-none');

		
		if ( coListing.Exclusive == 'Y' ){

			let oListingInfoModalBadgeExclusive = document.getElementById('ListingInfoModalBadgeExclusive_' + coListing.IdListing);

			if ( oListingInfoModalBadgeExclusive !== null && typeof oListingInfoModalBadgeExclusive == "object" ) oListingInfoModalBadgeExclusive.classList.add('d-none');


			let oBodyListingCardResultRibbonExclusive = document.getElementById('BodyListingCardResultRibbonExclusive_' + coListing.IdListing);

			if ( oBodyListingCardResultRibbonExclusive !== null && typeof oBodyListingCardResultRibbonExclusive == "object" ) oBodyListingCardResultRibbonExclusive.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'EXPIRED'
			){

			let oListingInfoModalBadgeExpired = document.getElementById('ListingInfoModalBadgeExpired_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeExpired !== null && typeof oListingInfoModalBadgeExpired == "object" ) oListingInfoModalBadgeExpired.classList.add('d-none');

			
			let oBodyListingCardResultBadgeExpired = document.getElementById('BodyListingCardResultBadgeExpired_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeExpired !== null && typeof oBodyListingCardResultBadgeExpired == "object" ) oBodyListingCardResultBadgeExpired.classList.add('d-none');

		}

		
		if (
			coListing.StatusDetail == 'UNPUBLISHED'
			){

			let oListingInfoModalBadgeUnpublished = document.getElementById('ListingInfoModalBadgeUnpublished_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeUnpublished !== null && typeof oListingInfoModalBadgeUnpublished == "object" ) oListingInfoModalBadgeUnpublished.classList.add('d-none');

			
			let oBodyListingCardResultBadgeUnpublished = document.getElementById('BodyListingCardResultBadgeUnpublished_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeUnpublished !== null && typeof oBodyListingCardResultBadgeUnpublished == "object" ) oBodyListingCardResultBadgeUnpublished.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'REACTIVATED'
			){

			let oListingInfoModalBadgeReactivated = document.getElementById('ListingInfoModalBadgeReactivated_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeReactivated !== null && typeof oListingInfoModalBadgeReactivated == "object" ) oListingInfoModalBadgeReactivated.classList.add('d-none');

			
			let oBodyListingCardResultBadgeReactivated = document.getElementById('BodyListingCardResultBadgeReactivated_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeReactivated !== null && typeof oBodyListingCardResultBadgeReactivated == "object" ) oBodyListingCardResultBadgeReactivated.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'UNBOOKED'
			){

			let oListingInfoModalBadgeUnbooked = document.getElementById('ListingInfoModalBadgeUnbooked_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeUnbooked !== null && typeof oListingInfoModalBadgeUnbooked == "object" ) oListingInfoModalBadgeUnbooked.classList.add('d-none');

			
			let oBodyListingCardResultBadgeUnbooked = document.getElementById('BodyListingCardResultBadgeUnbooked_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeUnbooked !== null && typeof oBodyListingCardResultBadgeUnbooked == "object" ) oBodyListingCardResultBadgeUnbooked.classList.add('d-none');

		}


		if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" )
			coEleModalListingInfoDivColEdit.classList.add('d-none');

		if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" )
			coEleModalListingInfoDivColPublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" )
			coEleModalListingInfoDivColRepost.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" )
			coEleModalListingInfoDivColRepublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" )
			coEleModalListingInfoDivColUnpublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" )
			coEleModalListingInfoDivColReactivate.classList.remove('d-none');

		if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" )
			coEleModalListingInfoDivColDeactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" )
			coEleModalListingInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" )
			coEleModalListingInfoDivColMarkBooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" )
			coEleModalListingInfoDivColMarkSold.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkTenanted !== null && typeof coEleModalListingInfoDivColMarkTenanted == "object" )
			coEleModalListingInfoDivColMarkTenanted.classList.add('d-none');

		if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" )
			coEleModalListingInfoDivColShare.classList.add('d-none');

		if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.add('d-none');

		
		coListing.coStatusDetail.innerText = 'DEACTIVATED';
		coListing.StatusDetail = 	coListing.coStatusDetail.innerText.trim().toUpperCase();

	}

}



async function fListingMarkBooked () {

	fIsAlive();
	

	let vUrlListingMarkBooked = gHost + "/listing/mark/booked?id=" + coListing.IdListing + "&booking_price=" + encodeURIComponent( coEleFormModalListingMarkBookedInputAmount.value );
//console.log(vUrlListingMarkBooked);

	const coResponse = await fetch( vUrlListingMarkBooked )

	const coData = await coResponse.text();
//console.log( coData.toString().trim() );

	if ( coData.toString().trim() == "success" ){

		let oListingInfoModalBadgeBooked = document.getElementById('ListingInfoModalBadgeBooked_' + coListing.IdListing);
		
		if ( oListingInfoModalBadgeBooked !== null && typeof oListingInfoModalBadgeBooked == "object" ) oListingInfoModalBadgeBooked.classList.remove('d-none');

		
		let oBodyListingCardResultBadgeBooked = document.getElementById('BodyListingCardResultBadgeBooked_' + coListing.IdListing);
		
		if ( oBodyListingCardResultBadgeBooked !== null && typeof oBodyListingCardResultBadgeBooked == "object" ) oBodyListingCardResultBadgeBooked.classList.remove('d-none');


		let oListingInfoModalRibbonUnavailable = document.getElementById('ListingInfoModalRibbonUnavailable_' + coListing.IdListing);


		if ( oListingInfoModalRibbonUnavailable !== null && typeof oListingInfoModalRibbonUnavailable == "object" ) {

			if (
				coStatusSubscribe == true
			) {

				oListingInfoModalRibbonUnavailable.classList.add('d-none');

			}
			else {

				oListingInfoModalRibbonUnavailable.classList.remove('d-none');

			}

		}

		
		let oBodyListingCardResultRibbonUnavailable = document.getElementById('BodyListingCardResultRibbonUnavailable_' + coListing.IdListing);

		if ( oBodyListingCardResultRibbonUnavailable !== null && typeof oBodyListingCardResultRibbonUnavailable == "object" ) {

			if (
				coStatusSubscribe == true
			) {

				oBodyListingCardResultRibbonUnavailable.classList.add('d-none');

			}
			else {

				oBodyListingCardResultRibbonUnavailable.classList.remove('d-none');

			}

		}

		if (
			coStatusSubscribe == true
		) {

			let oListingInfoModalRibbonOngoingDeal = document.getElementById('ListingInfoModalRibbonOngoingDeal_' + coListing.IdListing);

			if ( oListingInfoModalRibbonOngoingDeal !== null && typeof oListingInfoModalRibbonOngoingDeal == "object" ) oListingInfoModalRibbonOngoingDeal.classList.remove('d-none');

			
			let oBodyListingCardResultRibbonOngoingDeal = document.getElementById('BodyListingCardResultRibbonOngoingDeal_' + coListing.IdListing);

			if ( oBodyListingCardResultRibbonOngoingDeal !== null && typeof oBodyListingCardResultRibbonOngoingDeal == "object" ) oBodyListingCardResultRibbonOngoingDeal.classList.remove('d-none');

		}

		
		if ( coListing.Exclusive == 'Y' ){

			let oListingInfoModalBadgeExclusive = document.getElementById('ListingInfoModalBadgeExclusive_' + coListing.IdListing);

			if ( oListingInfoModalBadgeExclusive !== null && typeof oListingInfoModalBadgeExclusive == "object" ) oListingInfoModalBadgeExclusive.classList.add('d-none');


			let oBodyListingCardResultRibbonExclusive = document.getElementById('BodyListingCardResultRibbonExclusive_' + coListing.IdListing);

			if ( oBodyListingCardResultRibbonExclusive !== null && typeof oBodyListingCardResultRibbonExclusive == "object" ) oBodyListingCardResultRibbonExclusive.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'PUBLISHED'
			){

			let oListingInfoModalBadgePublished = document.getElementById('ListingInfoModalBadgePublished_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgePublished !== null && typeof oListingInfoModalBadgePublished == "object" ) oListingInfoModalBadgePublished.classList.add('d-none');

			
			let oBodyListingCardResultBadgePublished = document.getElementById('BodyListingCardResultBadgePublished_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgePublished !== null && typeof oBodyListingCardResultBadgePublished == "object" ) oBodyListingCardResultBadgePublished.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'EXPIRED'
			){

			let oListingInfoModalBadgeExpired = document.getElementById('ListingInfoModalBadgeExpired_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeExpired !== null && typeof oListingInfoModalBadgeExpired == "object" ) oListingInfoModalBadgeExpired.classList.add('d-none');

			
			let oBodyListingCardResultBadgeExpired = document.getElementById('BodyListingCardResultBadgeExpired_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeExpired !== null && typeof oBodyListingCardResultBadgeExpired == "object" ) oBodyListingCardResultBadgeExpired.classList.add('d-none');

		}

		
		if (
			coListing.StatusDetail == 'UNPUBLISHED'
			){

			let oListingInfoModalBadgeUnpublished = document.getElementById('ListingInfoModalBadgeUnpublished_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeUnpublished !== null && typeof oListingInfoModalBadgeUnpublished == "object" ) oListingInfoModalBadgeUnpublished.classList.add('d-none');

			
			let oBodyListingCardResultBadgeUnpublished = document.getElementById('BodyListingCardResultBadgeUnpublished_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeUnpublished !== null && typeof oBodyListingCardResultBadgeUnpublished == "object" ) oBodyListingCardResultBadgeUnpublished.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'REPUBLISHED'
			){

			let oListingInfoModalBadgeRepublished = document.getElementById('ListingInfoModalBadgeRepublished_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeRepublished !== null && typeof oListingInfoModalBadgeRepublished == "object" ) oListingInfoModalBadgeRepublished.classList.add('d-none');

			
			let oBodyListingCardResultBadgeRepublished = document.getElementById('BodyListingCardResultBadgeRepublished_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeRepublished !== null && typeof oBodyListingCardResultBadgeRepublished == "object" ) oBodyListingCardResultBadgeRepublished.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'REACTIVATED'
			){

			let oListingInfoModalBadgeReactivated = document.getElementById('ListingInfoModalBadgeReactivated_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeReactivated !== null && typeof oListingInfoModalBadgeReactivated == "object" ) oListingInfoModalBadgeReactivated.classList.add('d-none');

			
			let oBodyListingCardResultBadgeReactivated = document.getElementById('BodyListingCardResultBadgeReactivated_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeReactivated !== null && typeof oBodyListingCardResultBadgeReactivated == "object" ) oBodyListingCardResultBadgeReactivated.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'UNBOOKED'
			){

			let oListingInfoModalBadgeUnbooked = document.getElementById('ListingInfoModalBadgeUnbooked_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeUnbooked !== null && typeof oListingInfoModalBadgeUnbooked == "object" ) oListingInfoModalBadgeUnbooked.classList.add('d-none');

			
			let oBodyListingCardResultBadgeUnbooked = document.getElementById('BodyListingCardResultBadgeUnbooked_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeUnbooked !== null && typeof oBodyListingCardResultBadgeUnbooked == "object" ) oBodyListingCardResultBadgeUnbooked.classList.add('d-none');

		}


		if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" )
			coEleModalListingInfoDivColEdit.classList.add('d-none');

		if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" )
			coEleModalListingInfoDivColPublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" )
			coEleModalListingInfoDivColRepost.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" )
			coEleModalListingInfoDivColRepublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" )
			coEleModalListingInfoDivColUnpublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" )
			coEleModalListingInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" )
			coEleModalListingInfoDivColDeactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" )
			coEleModalListingInfoDivColMarkUnbooked.classList.remove('d-none');

		if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" )
			coEleModalListingInfoDivColMarkBooked.classList.add('d-none');

		if ( coListing.gModus == 'FOR SALE' &&
			coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" )
			coEleModalListingInfoDivColMarkSold.classList.remove('d-none');
		
		if ( coListing.Modus == 'FOR RENT' &&
			oEleModalListingInfoBtnMarkTenanted !== null && typeof oEleModalListingInfoBtnMarkTenanted == "object" )
			oEleModalListingInfoBtnMarkTenanted.classList.remove('d-none');

		if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" )
			coEleModalListingInfoDivColShare.classList.add('d-none');

		if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.add('d-none');
		

		coListing.coStatusDetail.innerText = 'BOOKED';
		coListing.StatusDetail = 	coListing.coStatusDetail.innerText.trim().toUpperCase();


		coModalListingMarkBooked.hide();
		
		//coModalListingInfo.show();
		fShowListingInfo ( '', coListing.IdListing );

	}

}

async function fListingMarkUnbooked () {

	fIsAlive();
	

	let vUrlListingMarkUnbooked = gHost + "/listing/mark/unbooked?id=" + coListing.IdListing;
//console.log(vUrlListingMarkUnbooked);

	const coResponse = await fetch( vUrlListingMarkUnbooked )

	const coData = await coResponse.text();
//console.log( coData.toString().trim() );

	if ( coData.toString().trim() == "success" ){

		let oListingInfoModalBadgeUnbooked = document.getElementById('ListingInfoModalBadgeUnbooked_' + coListing.IdListing);
		
		if ( oListingInfoModalBadgeUnbooked !== null && typeof oListingInfoModalBadgeUnbooked == "object" ) oListingInfoModalBadgeUnbooked.classList.remove('d-none');

		
		let oBodyListingCardResultBadgeUnbooked = document.getElementById('BodyListingCardResultBadgeUnbooked_' + coListing.IdListing);
		
		if ( oBodyListingCardResultBadgeUnbooked !== null && typeof oBodyListingCardResultBadgeUnbooked == "object" ) oBodyListingCardResultBadgeUnbooked.classList.remove('d-none');

		
		let oListingInfoModalRibbonUnavailable = document.getElementById('ListingInfoModalRibbonUnavailable_' + coListing.IdListing);

		if ( oListingInfoModalRibbonUnavailable !== null && typeof oListingInfoModalRibbonUnavailable == "object" ) oListingInfoModalRibbonUnavailable.classList.remove('d-none');


		let oBodyListingCardResultRibbonUnavailable = document.getElementById('BodyListingCardResultRibbonUnavailable_' + coListing.IdListing);

		if ( oBodyListingCardResultRibbonUnavailable !== null && typeof oBodyListingCardResultRibbonUnavailable == "object" ) oBodyListingCardResultRibbonUnavailable.classList.remove('d-none');


		let oListingInfoModalRibbonOngoingDeal = document.getElementById('ListingInfoModalRibbonOngoingDeal_' + coListing.IdListing);

		if ( oListingInfoModalRibbonOngoingDeal !== null && typeof oListingInfoModalRibbonOngoingDeal == "object" ) oListingInfoModalRibbonOngoingDeal.classList.add('d-none');

		
		let oBodyListingCardResultRibbonOngoingDeal = document.getElementById('BodyListingCardResultRibbonOngoingDeal_' + coListing.IdListing);

		if ( oBodyListingCardResultRibbonOngoingDeal !== null && typeof oBodyListingCardResultRibbonOngoingDeal == "object" ) oBodyListingCardResultRibbonOngoingDeal.classList.add('d-none');

		
		if ( coListing.Exclusive == 'Y' ){

			let oListingInfoModalBadgeExclusive = document.getElementById('ListingInfoModalBadgeExclusive_' + coListing.IdListing);

			if ( oListingInfoModalBadgeExclusive !== null && typeof oListingInfoModalBadgeExclusive == "object" ) oListingInfoModalBadgeExclusive.classList.add('d-none');


			let oBodyListingCardResultRibbonExclusive = document.getElementById('BodyListingCardResultRibbonExclusive_' + coListing.IdListing);

			if ( oBodyListingCardResultRibbonExclusive !== null && typeof oBodyListingCardResultRibbonExclusive == "object" ) oBodyListingCardResultRibbonExclusive.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'BOOKED'
			){

			let oListingInfoModalBadgeBooked = document.getElementById('ListingInfoModalBadgeBooked_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeBooked !== null && typeof oListingInfoModalBadgeBooked == "object" ) oListingInfoModalBadgeBooked.classList.add('d-none');

			
			let oBodyListingCardResultBadgeBooked = document.getElementById('BodyListingCardResultBadgeBooked_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeBooked !== null && typeof oBodyListingCardResultBadgeBooked == "object" ) oBodyListingCardResultBadgeBooked.classList.add('d-none');

		}


		if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" )
			coEleModalListingInfoDivColEdit.classList.remove('d-none');

		if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" )
			coEleModalListingInfoDivColPublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" )
			coEleModalListingInfoDivColRepost.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" )
			coEleModalListingInfoDivColRepublish.classList.remove('d-none');

		if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" )
			coEleModalListingInfoDivColUnpublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" )
			coEleModalListingInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" )
			coEleModalListingInfoDivColDeactivate.classList.remove('d-none');

		if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" )
			coEleModalListingInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" )
			coEleModalListingInfoDivColMarkBooked.classList.remove('d-none');

		if ( coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" )
			coEleModalListingInfoDivColMarkSold.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkTenanted !== null && typeof coEleModalListingInfoDivColMarkTenanted == "object" )
			coEleModalListingInfoDivColMarkTenanted.classList.add('d-none');

		if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" )
			coEleModalListingInfoDivColShare.classList.add('d-none');

		if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.add('d-none');
		

		coListing.coStatusDetail.innerText = 'UNBOOKED';
		coListing.StatusDetail = 	coListing.coStatusDetail.innerText.trim().toUpperCase();

	}

}

async function fListingMarkSold () {

	fIsAlive();
	

	let vUrlListingMarkSold = gHost + "/listing/mark/sold?id=" + coListing.IdListing + "&sold_price=" + encodeURIComponent( coEleFormModalListingMarkSoldInputAmount.value );
//console.log(vUrlListingMarkSold);

	const coResponse = await fetch( vUrlListingMarkSold )

	const coData = await coResponse.text();
//console.log( coData.toString().trim() );

	if ( coData.toString().trim() == "success" ){

		let oListingInfoModalBadgeSold = document.getElementById('ListingInfoModalBadgeSold_' + coListing.IdListing);
		
		if ( oListingInfoModalBadgeSold !== null && typeof oListingInfoModalBadgeSold == "object" ) oListingInfoModalBadgeSold.classList.remove('d-none');

		
		let oBodyListingCardResultBadgeSold = document.getElementById('BodyListingCardResultBadgeSold_' + coListing.IdListing);
		
		if ( oBodyListingCardResultBadgeSold !== null && typeof oBodyListingCardResultBadgeSold == "object" ) oBodyListingCardResultBadgeSold.classList.remove('d-none');

		
		let oListingInfoModalRibbonUnavailable = document.getElementById('ListingInfoModalRibbonUnavailable_' + coListing.IdListing);

		if ( oListingInfoModalRibbonUnavailable !== null && typeof oListingInfoModalRibbonUnavailable == "object" ) {

			if (
				coStatusSubscribe == true
			) {

				oListingInfoModalRibbonUnavailable.classList.add('d-none');

			}
			else {

				oListingInfoModalRibbonUnavailable.classList.remove('d-none');

			}

		}

		
		let oBodyListingCardResultRibbonUnavailable = document.getElementById('BodyListingCardResultRibbonUnavailable_' + coListing.IdListing);

		if ( oBodyListingCardResultRibbonUnavailable !== null && typeof oBodyListingCardResultRibbonUnavailable == "object" ) {

			if (
				coStatusSubscribe == true
			) {

				oBodyListingCardResultRibbonUnavailable.classList.add('d-none');

			}
			else {

				oBodyListingCardResultRibbonUnavailable.classList.remove('d-none');

			}
		
		}


		if (
			coStatusSubscribe == true
		){
		
			let oListingInfoModalRibbonDoneDeal = document.getElementById('ListingInfoModalRibbonDoneDeal_' + coListing.IdListing);

			if ( oListingInfoModalRibbonDoneDeal !== null && typeof oListingInfoModalRibbonDoneDeal == "object" ) oListingInfoModalRibbonDoneDeal.classList.remove('d-none');

			
			let oBodyListingCardResultRibbonDoneDeal = document.getElementById('BodyListingCardResultRibbonDoneDeal_' + coListing.IdListing);

			if ( oBodyListingCardResultRibbonDoneDeal !== null && typeof oBodyListingCardResultRibbonDoneDeal == "object" ) oBodyListingCardResultRibbonDoneDeal.classList.remove('d-none');

		}

		
		if ( coListing.Exclusive == 'Y' ){

			let oListingInfoModalBadgeExclusive = document.getElementById('ListingInfoModalBadgeExclusive_' + coListing.IdListing);

			if ( oListingInfoModalBadgeExclusive !== null && typeof oListingInfoModalBadgeExclusive == "object" ) oListingInfoModalBadgeExclusive.classList.add('d-none');


			let oBodyListingCardResultRibbonExclusive = document.getElementById('BodyListingCardResultRibbonExclusive_' + coListing.IdListing);

			if ( oBodyListingCardResultRibbonExclusive !== null && typeof oBodyListingCardResultRibbonExclusive == "object" ) oBodyListingCardResultRibbonExclusive.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'BOOKED'
			){

			let oListingInfoModalBadgeBooked = document.getElementById('ListingInfoModalBadgeBooked_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeBooked !== null && typeof oListingInfoModalBadgeBooked == "object" ) oListingInfoModalBadgeBooked.classList.add('d-none');

			
			let oBodyListingCardResultBadgeBooked = document.getElementById('BodyListingCardResultBadgeBooked_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeBooked !== null && typeof oBodyListingCardResultBadgeBooked == "object" ) oBodyListingCardResultBadgeBooked.classList.add('d-none');

		}

		
		if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" )
			coEleModalListingInfoDivColEdit.classList.add('d-none');

		if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" )
			coEleModalListingInfoDivColPublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" )
			coEleModalListingInfoDivColRepost.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" )
			coEleModalListingInfoDivColRepublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" )
			coEleModalListingInfoDivColUnpublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" )
			coEleModalListingInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" )
			coEleModalListingInfoDivColDeactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" )
			coEleModalListingInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" )
			coEleModalListingInfoDivColMarkBooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" )
			coEleModalListingInfoDivColMarkSold.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkTenanted !== null && typeof coEleModalListingInfoDivColMarkTenanted == "object" )
			coEleModalListingInfoDivColMarkTenanted.classList.add('d-none');

		if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" )
			coEleModalListingInfoDivColShare.classList.add('d-none');

		if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.add('d-none');


		coListing.coStatusDetail.innerText = 'SOLD';
		coListing.StatusDetail = 	coListing.coStatusDetail.innerText.trim().toUpperCase();


		coModalListingMarkSold.hide();
		
		//coModalListingInfo.show();
		fShowListingInfo ( '', coListing.IdListing );

	}

}

async function fListingMarkTenanted () {

	fIsAlive();
	

	let vUrlListingMarkTenanted = gHost + "/listing/mark/tenanted?id=" + coListing.IdListing + "&sold_price=" + encodeURIComponent( coEleFormModalListingMarkSoldInputAmount.value );
//console.log(vUrlListingMarkSold);

	const coResponse = await fetch( vUrlListingMarkTenanted )

	const coData = await coResponse.text();
//console.log( coData.toString().trim() );

	if ( coData.toString().trim() == "success" ){

		let oListingInfoModalBadgeSold = document.getElementById('ListingInfoModalBadgeSold_' + coListing.IdListing);
		
		if ( oListingInfoModalBadgeSold !== null && typeof oListingInfoModalBadgeSold == "object" ) oListingInfoModalBadgeSold.classList.remove('d-none');

		
		let oBodyListingCardResultBadgeSold = document.getElementById('BodyListingCardResultBadgeSold_' + coListing.IdListing);
		
		if ( oBodyListingCardResultBadgeSold !== null && typeof oBodyListingCardResultBadgeSold == "object" ) oBodyListingCardResultBadgeSold.classList.remove('d-none');

		
		let oListingInfoModalRibbonUnavailable = document.getElementById('ListingInfoModalRibbonUnavailable_' + coListing.IdListing);


		if ( oListingInfoModalRibbonUnavailable !== null && typeof oListingInfoModalRibbonUnavailable == "object" ) oListingInfoModalRibbonUnavailable.classList.remove('d-none');

		
		let oBodyListingCardResultRibbonUnavailable = document.getElementById('BodyListingCardResultRibbonUnavailable_' + coListing.IdListing);

		if ( oBodyListingCardResultRibbonUnavailable !== null && typeof oBodyListingCardResultRibbonUnavailable == "object" ) oBodyListingCardResultRibbonUnavailable.classList.remove('d-none');

		
		if ( coListing.Exclusive == 'Y' ){

			let oListingInfoModalBadgeExclusive = document.getElementById('ListingInfoModalBadgeExclusive_' + coListing.IdListing);

			if ( oListingInfoModalBadgeExclusive !== null && typeof oListingInfoModalBadgeExclusive == "object" ) oListingInfoModalBadgeExclusive.classList.add('d-none');


			let oBodyListingCardResultRibbonExclusive = document.getElementById('BodyListingCardResultRibbonExclusive_' + coListing.IdListing);

			if ( oBodyListingCardResultRibbonExclusive !== null && typeof oBodyListingCardResultRibbonExclusive == "object" ) oBodyListingCardResultRibbonExclusive.classList.add('d-none');

		}


		if (
			coListing.StatusDetail == 'BOOKED'
			){

			let oListingInfoModalBadgeBooked = document.getElementById('ListingInfoModalBadgeBooked_' + coListing.IdListing);
			
			if ( oListingInfoModalBadgeBooked !== null && typeof oListingInfoModalBadgeBooked == "object" ) oListingInfoModalBadgeBooked.classList.add('d-none');

			
			let oBodyListingCardResultBadgeBooked = document.getElementById('BodyListingCardResultBadgeBooked_' + coListing.IdListing);
			
			if ( oBodyListingCardResultBadgeBooked !== null && typeof oBodyListingCardResultBadgeBooked == "object" ) oBodyListingCardResultBadgeBooked.classList.add('d-none');

		}

		if ( coEleModalListingInfoDivColEdit !== null && typeof coEleModalListingInfoDivColEdit == "object" )
			coEleModalListingInfoDivColEdit.classList.add('d-none');

		if ( coEleModalListingInfoDivColPublish !== null && typeof coEleModalListingInfoDivColPublish == "object" )
			coEleModalListingInfoDivColPublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepost !== null && typeof coEleModalListingInfoDivColRepost == "object" )
			coEleModalListingInfoDivColRepost.classList.add('d-none');

		if ( coEleModalListingInfoDivColRepublish !== null && typeof coEleModalListingInfoDivColRepublish == "object" )
			coEleModalListingInfoDivColRepublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColUnpublish !== null && typeof coEleModalListingInfoDivColUnpublish == "object" )
			coEleModalListingInfoDivColUnpublish.classList.add('d-none');

		if ( coEleModalListingInfoDivColReactivate !== null && typeof coEleModalListingInfoDivColReactivate == "object" )
			coEleModalListingInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColDeactivate !== null && typeof coEleModalListingInfoDivColDeactivate == "object" )
			coEleModalListingInfoDivColDeactivate.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkUnbooked !== null && typeof coEleModalListingInfoDivColMarkUnbooked == "object" )
			coEleModalListingInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkBooked !== null && typeof coEleModalListingInfoDivColMarkBooked == "object" )
			coEleModalListingInfoDivColMarkBooked.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkSold !== null && typeof coEleModalListingInfoDivColMarkSold == "object" )
			coEleModalListingInfoDivColMarkSold.classList.add('d-none');

		if ( coEleModalListingInfoDivColMarkTenanted !== null && typeof coEleModalListingInfoDivColMarkTenanted == "object" )
			coEleModalListingInfoDivColMarkTenanted.classList.add('d-none');

		if ( coEleModalListingInfoDivColShare !== null && typeof coEleModalListingInfoDivColShare == "object" )
			coEleModalListingInfoDivColShare.classList.add('d-none');

		if ( coModalListingInfoDivColShareMulti !== null && typeof coModalListingInfoDivColShareMulti == "object" ) coModalListingInfoDivColShareMulti.classList.add('d-none');
				

		coListing.coStatusDetail.innerText = 'SOLD';
		coListing.StatusDetail = 	coListing.coStatusDetail.innerText.trim().toUpperCase();


		coModalListingMarkSold.hide();
		
		//coModalListingInfo.show();
		fShowListingInfo ( '', coListing.IdListing );

	}

}


async function fListingDownloadZip(){

	let oModalDivListingOwnership = document.getElementById('DivListingOwnership_' + coListing.IdListing);

	let oModalDivListingCoMarketingStatus = document.getElementById('DivListingCoMarketingStatus_' + coListing.IdListing);

	let vError = false;

	
	if ( coListing.Ownership == 'NO' ){

		if ( coListing.CoMarketingStatus != 'Y' ){

			alert('Please do Co-Marketing this Listing before download this Listing information.');

			vError = true;

			return false;

		}

	}
	
	if ( vError === false ){

		if( !JSZip.support.blob ){
			alert('Saving Listing not supported in this browser.');
			return false;
		}

		const coModalListingListingTitle = document.getElementById( 'ModalListingListingTitle_' + coListing.IdListing );

		const coModalListingListingCopywriting = document.getElementById( 'ModalListingListingCopywriting_' + coListing.IdListing );

		const coModalListingListingPhotoOriginal = document.getElementById( 'ModalListingListingPhotoOriginal_' + coListing.IdListing );

		if ( coModalListingListingPhotoOriginal !== null && typeof coModalListingListingPhotoOriginal == "object" ){

			
			const vUrlListingDownloadInit = gHost + "/listing/comarketing/download/init?id=" + coListing.IdListing + '&ownership=' + coListing.Ownership;
//console.log( vUrlListingDownloadInit );

			const coResponseListingDownloadInit = await fetch( vUrlListingDownloadInit );
//console.log( coResponseListingDownloadInit );

			const coDataListingDownloadInit = await coResponseListingDownloadInit.text();
//console.log( coDataListingDownloadInit );


			const coArImgListing = coModalListingListingPhotoOriginal.getElementsByTagName('img');

			const coZip = new JSZip();

			coZip.file( "copywriting-" + coListing.IdListing + ".txt", coModalListingListingCopywriting.innerText );

			for( const oImg of coArImgListing ){
				let vImgUrl = oImg.src;
				let vLocQuestionMark = vImgUrl.indexOf('?');

				while ( vLocQuestionMark > -1 ){
					vImgUrl = vImgUrl.substring(0, vLocQuestionMark);

					vLocQuestionMark = vImgUrl.indexOf('?');
				}

				//let vFileName = vImgUrl.replace(/.*\//g, "");
				let vFileName = oImg.id.split('?')[0].split('/').pop();
				//let vIndex = vFileName.split('-').pop().split('.')[0];
				//vFileName = `photo-${vIndex}.jpg`;
//console.log( vFileName );

				vImgUrl = oImg.src;

//console.log(vImgUrl);
//console.log(vFileName);

				coZip.file( 
						vFileName, 
						new Promise( 
								function( resolve, reject ) {
									JSZipUtils.getBinaryContent( 
										vImgUrl, 
										function ( pError, pData ) {
											if( pError ) {
												reject( pError );
											}
											else {
												resolve( pData );
											}
										}
									)
								}
						),
						{
							binary: true
						} 
					);

			}

			coZip.generateAsync(
				{
				type:"blob",
				compression: "DEFLATE"
				} 
			)
        	.then(
        	 	function ( pZipBlob ) {
					// see FileSaver.js
					saveAs( pZipBlob, "propmall-listing-" + coListing.IdListing + ( ( coModalListingListingTitle !== null && typeof coModalListingListingTitle == "object" ) ? ( '-' + coModalListingListingTitle.innerText ) : '' ) + ".zip" );
        		}, 
        		function ( pError ) {
//console.log( pError );
				}
			);

			
			const vUrlListingDownloadDone = gHost + "/listing/comarketing/download/done?id=" + coListing.IdListing + '&ownership=' + coListing.Ownership;
//console.log( vUrlListingDownloadDone );

			const coResponseListingDownloadDone = await fetch( vUrlListingDownloadDone );
//console.log( coResponseListingDownloadDone );

			const coDataListingDownloadDone = await coResponseListingDownloadDone.text();
//console.log( coDataListingDownloadDone );

		}

	}

	return false;
}


async function fShareListing( pShareMod ){

	let vUrlShare = gHost + "/share/new";

	let oModalDivListingOwnership = document.getElementById('DivListingOwnership_' + coListing.IdListing);

	let oModalDivListingCoMarketingStatus = document.getElementById('DivListingCoMarketingStatus_' + coListing.IdListing);

	let vError = false;

	let vShareType = 'LISTING';

	
	if ( coListing.Ownership == 'NO' ){

		vShareType = 'COMARKETING';

		vUrlShare += "/comarketing";

		if ( coListing.CoMarketingStatus != 'Y' ){

			alert('Please do Co-Marketing this Listing before sharing.');

			vError = true;

			return false;

		}

	}
	else {
		
		vUrlShare += "/listing";

	}

	vUrlShare += "?id_listing=" + coListing.IdListing + "&sharemod=" + pShareMod + "&sharetype=" + vShareType;


	if ( vError === false ){

		if ( navigator.share ) {
			
			const coResponse = await fetch( vUrlShare )

			const coData = await coResponse.json();
//const coData = await coResponse.text();
//console.log( coData );
//return false;

			//let oModalListingListingSharingLink = document.getElementById( 'ModalListingListingSharingLink_' + coListing.IdListing );

			let oModalListingListingSharingText = document.getElementById( 'ModalListingListingSharingText_' + coListing.IdListing );

			let oModalListingListingTitle = document.getElementById( 'ModalListingListingTitle_' + coListing.IdListing );

			navigator.share(
				{
					title: ( oModalListingListingTitle.innerText ),
					text: (
						(
							pShareMod == 'PARTNER'
							?
							'Hello Partner Agents,\n\nI want to share this Listing in PropMall with you.\n\n'
							:
							''
						)
						+
						oModalListingListingSharingText.innerText 
					),
					/* url: ( oModalListingListingSharingLink.innerText ) */
					url: ( coData.share.link )
				}
			).then(
				() => {
//console.log('Thanks for sharing!');
				}
			).catch(
				console.error
			);

		}
		else {

			alert( 'Your browser does not support sharing.' );

		}

	}

	return false;

}

/*****************************************************************/

const coHtml_DivProspectMatching_NotPublished = '<div id="DivProspectMatching_NotPublished" class="row g-0" style="border-bottom: 1px solid #cccccc;"><div class="col text-center py-4"><p class="mt-1 mb-1">Publish your Prospect to enable matching process.</p></div></div>';

const coHtml_DivProspectMatching_None = '<div id="DivProspectMatching_None" class="row g-0" style="border-bottom: 1px solid #cccccc;"><div class="col text-center py-4"><p class="mt-1 mb-1">This Prospect does not matched any Listing yet.</p></div></div>';

const coHtml_DivProspectMatching_ReMatchingProc = '<div id="DivProspectMatching_ReMatchingProc" class="row g-0" style="border-bottom: 1px solid #cccccc;"><div class="col py-4"><p class="text-center text-danger mt-1 mb-1">Prospect Re-Matching In Progress....</p></div></div>';


const coEleModalProspectInfo = document.getElementById('ModalProspectInfo');
const coEleModalProspectMarkBooking = document.getElementById('ModalProspectMarkBooking');
const coEleModalProspectMarkPurchased = document.getElementById('ModalProspectMarkPurchased');


let oEleModalProspectInfoShowStatus = 'NO';
let oEleModalProspectMarkBookingShowStatus = 'NO';
let oEleModalProspectMarkPurchasedShowStatus = 'NO';


const coModalProspectInfo = ( coEleModalProspectInfo !== null && typeof coEleModalProspectInfo == "object" ) ? new bootstrap.Modal( coEleModalProspectInfo ) : null;

const coModalProspectMarkBooking = ( coEleModalProspectMarkBooking !== null && typeof coEleModalProspectMarkBooking == "object" ) ? new bootstrap.Modal( coEleModalProspectMarkBooking ) : null;

const coModalProspectMarkPurchased = ( coEleModalProspectMarkPurchased !== null && typeof coEleModalProspectMarkPurchased == "object" ) ? new bootstrap.Modal( coEleModalProspectMarkPurchased ) : null;

const coEleModalProspectInfoBody = ( coEleModalProspectInfo !== null && typeof coEleModalProspectInfo == "object" ) ? document.getElementById('ModalProspectInfoBody') : null;


if ( coEleModalProspectInfo !== null && typeof coEleModalProspectInfo == "object" ){

	coEleModalProspectInfo.addEventListener( 'hidden.bs.modal', function () {

		coEleModalProspectInfoBody.innerHTML = '';

		oEleModalProspectInfoShowStatus = 'NO';

	});


	coEleModalProspectInfo.addEventListener( 'shown.bs.modal', function () {

		oEleModalProspectInfoShowStatus = 'YES';

	});

}

if ( coEleModalProspectMarkBooking !== null && typeof coEleModalProspectMarkBooking == "object" ){

	coEleModalProspectMarkBooking.addEventListener( 'hidden.bs.modal', function () {
		
		oEleModalProspectMarkBookingShowStatus = 'NO';

	});


	coEleModalProspectMarkBooking.addEventListener( 'shown.bs.modal', function () {

		oEleModalProspectMarkBookingShowStatus = 'YES';

	});

}

if ( coEleModalProspectMarkPurchased !== null && typeof coEleModalProspectMarkPurchased == "object" ){

	coEleModalProspectMarkPurchased.addEventListener( 'hidden.bs.modal', function () {
		
		oEleModalProspectMarkPurchasedShowStatus = 'NO';
		
	});


	coEleModalProspectMarkPurchased.addEventListener( 'shown.bs.modal', function () {

		oEleModalProspectMarkPurchasedShowStatus = 'YES';

	});

}



const coEleModalProspectInfo_BtnViewMatchingListingMobile = document.getElementById('ModalProspectInfo_BtnViewMatchingListingMobile');
const coEleModalProspectInfo_BtnViewMatchingListingDesktop = document.getElementById('ModalProspectInfo_BtnViewMatchingListingDesktop');

const coEleModalProspectInfoDivColEdit = document.getElementById('ModalProspectInfoDivColEdit');
const coEleModalProspectInfoHrefEdit = document.getElementById('ModalProspectInfoHrefEdit');

const coEleModalProspectInfoDivColDelete = document.getElementById('ModalProspectInfoDivColDelete');
const coEleModalProspectInfoBtnDelete = document.getElementById('ModalProspectInfoBtnDelete');

const coEleModalProspectInfoDivColPublish = document.getElementById('ModalProspectInfoDivColPublish');
const coEleModalProspectInfoBtnPublish = document.getElementById('ModalProspectInfoBtnPublish');

const coEleModalProspectInfoDivColReMatching = document.getElementById('ModalProspectInfoDivCoReMatching');
const coEleModalProspectInfoBtnReMatching = document.getElementById('ModalProspectInfoBtnReMatching');

const coEleModalProspectInfoDivColRepublish = document.getElementById('ModalProspectInfoDivColRepublish');
const coEleModalProspectInfoBtnRepublish = document.getElementById('ModalProspectInfoBtnRepublish');

const coEleModalProspectInfoDivColUnpublish = document.getElementById('ModalProspectInfoDivColUnpublish');
const coEleModalProspectInfoBtnUnpublish = document.getElementById('ModalProspectInfoBtnUnpublish');

const coEleModalProspectInfoDivColReactivate = document.getElementById('ModalProspectInfoDivColReactivate');
const coEleModalProspectInfoBtnReactivate = document.getElementById('ModalProspectInfoBtnReactivate');

const coEleModalProspectInfoDivColDeactivate = document.getElementById('ModalProspectInfoDivColDeactivate');
const coEleModalProspectInfoBtnDeactivate = document.getElementById('ModalProspectInfoBtnDeactivate');

const coEleModalProspectInfoDivColMarkUnbooked = document.getElementById('ModalProspectInfoDivColMarkUnbooked');
const coEleModalProspectInfoBtnMarkUnbooked = document.getElementById('ModalProspectInfoBtnMarkUnbooked');

const coEleModalProspectInfoDivColMarkBooking = document.getElementById('ModalProspectInfoDivColMarkBooking');
const coEleModalProspectInfoBtnMarkBooking = document.getElementById('ModalProspectInfoBtnMarkBooking');

const coEleModalProspectInfoDivColMarkPurchased = document.getElementById('ModalProspectInfoDivColMarkPurchased');
const coEleModalProspectInfoBtnMarkPurchased = document.getElementById('ModalProspectInfoBtnMarkPurchased');

const coEleModalProspectInfoDivColMarkRented = document.getElementById('ModalProspectInfoDivColMarkRented');
const coEleModalProspectInfoBtnMarkRented = document.getElementById('ModalProspectInfoBtnMarkRented');


const coEleFormModalProspectMarkBooking = document.getElementById('FormModalProspectMarkBooking');
const coEleFormModalProspectMarkBookingInputAmount = document.getElementById('FormModalProspectMarkBookingInputAmount');
const coEleFormModalProspectMarkBookingDivDropdownMatchingListing = document.getElementById('FormModalProspectMarkBookingDivDropdownMatchingListing');
const coEleFormModalProspectMarkBookingDivDropdownMatchingListingDivSelection = document.getElementById('FormModalProspectMarkBookingDivDropdownMatchingListingDivSelection');
const coEleFormModalProspectMarkBookingInputMatchingIdListing = document.getElementById('FormModalProspectMarkBookingInputMatchingIdListing');
const coEleFormModalProspectMarkBookingDivDropdownMatchingListingSpanSelectedDescription = document.getElementById('FormModalProspectMarkBookingDivDropdownMatchingListingSpanSelectedDescription');

const coEleFormModalProspectMarkPurchased = document.getElementById('FormModalProspectMarkPurchased');
const coEleFormModalProspectMarkPurchasedInputAmount = document.getElementById('FormModalProspectMarkPurchasedInputAmount');
const coEleFormModalProspectMarkPurchasedDivBookingListingInfo = document.getElementById('FormModalProspectMarkPurchasedDivBookingListingInfo');


const coProspect = {
					IdProspect		: 	null,
					Ownership 		: 	null,
					Modus 			: 	null,
					Status 			:   null,

					coStatusDetail	: 	null,
					StatusDetail 	: 	null,

					BgColor 		: 	null,
					RegNo 			: 	null
				};


if ( coEleModalProspectInfoBtnDelete !== null && typeof coEleModalProspectInfoBtnDelete == "object" ) {

	coEleModalProspectInfoBtnDelete.addEventListener( 'click', function () {
		fProspectDelete();
	});

}

if ( coEleModalProspectInfoBtnPublish !== null && typeof coEleModalProspectInfoBtnPublish == "object" ) {

	coEleModalProspectInfoBtnPublish.addEventListener( 'click', function () {
		fProspectPublish();
	});

}

if ( coEleModalProspectInfoBtnReMatching !== null && typeof coEleModalProspectInfoBtnReMatching == "object" ) {

	coEleModalProspectInfoBtnReMatching.addEventListener( 'click', function () {
		fProspectReMatching();
	});

}

if ( coEleModalProspectInfoBtnRepublish !== null && typeof coEleModalProspectInfoBtnRepublish == "object" ) {

	coEleModalProspectInfoBtnRepublish.addEventListener( 'click', function () {
		fProspectRepublish();
	});

}

if ( coEleModalProspectInfoBtnUnpublish !== null && typeof coEleModalProspectInfoBtnUnpublish == "object" ) {

	coEleModalProspectInfoBtnUnpublish.addEventListener( 'click', function () {
		fProspectUnpublish();
	});

}

if ( coEleModalProspectInfoBtnReactivate !== null && typeof coEleModalProspectInfoBtnReactivate == "object" ) {

	coEleModalProspectInfoBtnReactivate.addEventListener( 'click', function () {
		fProspectReactivate();
	});

}

if ( coEleModalProspectInfoBtnDeactivate !== null && typeof coEleModalProspectInfoBtnDeactivate == "object" ) {

	coEleModalProspectInfoBtnDeactivate.addEventListener( 'click', function () {
		fProspectDeactivate();
	});

}

if ( coEleModalProspectInfoBtnMarkUnbooked !== null && typeof coEleModalProspectInfoBtnMarkUnbooked == "object" ) {

	coEleModalProspectInfoBtnMarkUnbooked.addEventListener( 'click', function () {
		fProspectMarkUnbooked();
	});

}

if ( coEleModalProspectInfoBtnMarkBooking !== null && typeof coEleModalProspectInfoBtnMarkBooking == "object" ) {

	coEleModalProspectInfoBtnMarkBooking.addEventListener( 'click', async function () {

		coEleFormModalProspectMarkBookingInputAmount.value = '';
		coEleFormModalProspectMarkBookingInputMatchingIdListing.value = '';
		coEleFormModalProspectMarkBookingDivDropdownMatchingListingSpanSelectedDescription.innerHTML = '[ Select Matching Listing ]';
		
		const coEleModalProspectMarkBookingBodySpanLabelBuy1 = document.getElementById('ModalProspectMarkBookingBodySpanLabelBuy1');
		const coEleModalProspectMarkBookingBodySpanLabelBuy2 = document.getElementById('ModalProspectMarkBookingBodySpanLabelBuy2');


		const coEleModalProspectMarkBookingBodySpanLabelRent1 = document.getElementById('ModalProspectMarkBookingBodySpanLabelRent1');
		const coEleModalProspectMarkBookingBodySpanLabelRent2 = document.getElementById('ModalProspectMarkBookingBodySpanLabelRent2');


		if (
			coProspect.Modus == 'WTB'
		){

			coEleModalProspectMarkBookingBodySpanLabelBuy1.classList.add( 'd-inline' );
			coEleModalProspectMarkBookingBodySpanLabelBuy2.classList.add( 'd-inline' );

			coEleModalProspectMarkBookingBodySpanLabelBuy1.classList.remove( 'd-none' );
			coEleModalProspectMarkBookingBodySpanLabelBuy2.classList.remove( 'd-none' );


			coEleModalProspectMarkBookingBodySpanLabelRent1.classList.remove( 'd-inline' );
			coEleModalProspectMarkBookingBodySpanLabelRent2.classList.remove( 'd-inline' );

			coEleModalProspectMarkBookingBodySpanLabelRent1.classList.add( 'd-none' );
			coEleModalProspectMarkBookingBodySpanLabelRent2.classList.add( 'd-none' );

		}
		else if (
			coProspect.Modus == 'WTR'
		){

			coEleModalProspectMarkBookingBodySpanLabelBuy1.classList.remove( 'd-inline' );
			coEleModalProspectMarkBookingBodySpanLabelBuy2.classList.remove( 'd-inline' );

			coEleModalProspectMarkBookingBodySpanLabelBuy1.classList.add( 'd-none' );
			coEleModalProspectMarkBookingBodySpanLabelBuy2.classList.add( 'd-none' );


			coEleModalProspectMarkBookingBodySpanLabelRent1.classList.add( 'd-inline' );
			coEleModalProspectMarkBookingBodySpanLabelRent2.classList.add( 'd-inline' );

			coEleModalProspectMarkBookingBodySpanLabelRent1.classList.remove( 'd-none' );
			coEleModalProspectMarkBookingBodySpanLabelRent2.classList.remove( 'd-none' );

		}


		if ( coEleFormModalProspectMarkBookingDivDropdownMatchingListingDivSelection !== null && typeof coEleFormModalProspectMarkBookingDivDropdownMatchingListingDivSelection == "object" ) {

			coEleFormModalProspectMarkBookingDivDropdownMatchingListingDivSelection.innerHTML = '';


			let vUrlProspectMarkBookingMatchingListing = gHost + "/prospect/mark/booking/matching-listing?id=" + coProspect.IdProspect;

			const coResponse = await fetch( vUrlProspectMarkBookingMatchingListing );
			const coData = await coResponse.text();

			if ( coData != "invalid" ){

				if ( coData == "0" ){

				coEleFormModalProspectMarkBookingDivDropdownMatchingListingDivSelection.innerHTML = '<a id="FormModalProspectMarkBookingDivDropdownMatchingListingAhrefOption_0" class="dropdown-item text-nowrap border-secondary border rounded-0 text-wrap border-start-0 border-end-0 border-bottom-0 pt-2" href="javascript: fProspectMarkBooking_SelectMatchingListing( 0 );"><i class="fas fa-angle-double-right"></i>&nbsp;Other Listing (not in this list)&nbsp;<i class="fas fa-angle-double-left"></a>';

				}
				else {

					coEleFormModalProspectMarkBookingDivDropdownMatchingListingDivSelection.innerHTML = coData;

				}


				coModalProspectInfo.hide();
				coModalProspectMarkBooking.show();

			}

		}

	});

}

if ( coEleModalProspectInfoBtnMarkPurchased !== null && typeof coEleModalProspectInfoBtnMarkPurchased == "object" ) {

	coEleModalProspectInfoBtnMarkPurchased.addEventListener( 'click', async function () {
		//fProspectMarkPurchased();

		const coEleModalProspectMarkPurchasedHeaderSpanLabelBuy = document.getElementById('ModalProspectMarkPurchasedHeaderSpanLabelBuy');
		const coEleModalProspectMarkPurchasedHeaderSpanLabelRent = document.getElementById('ModalProspectMarkPurchasedHeaderSpanLabelRent');

		const coEleModalProspectMarkPurchasedBodySpanLabelBuy1 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelBuy1');
		const coEleModalProspectMarkPurchasedBodySpanLabelBuy2 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelBuy2');
		const coEleModalProspectMarkPurchasedBodySpanLabelBuy3 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelBuy3');


		const coEleModalProspectMarkPurchasedBodySpanLabelRent1 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelRent1');
		const coEleModalProspectMarkPurchasedBodySpanLabelRent2 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelRent2');
		const coEleModalProspectMarkPurchasedBodySpanLabelRent3 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelRent3');

		//const coEleModalProspectMarkPurchasedFooterSpanLabelBuy = document.getElementById('ModalProspectMarkPurchasedFooterSpanLabelBuy');
		//const coEleModalProspectMarkPurchasedFooterSpanLabelRent = document.getElementById('ModalProspectMarkPurchasedFooterSpanLabelRent');


		coEleModalProspectMarkPurchasedHeaderSpanLabelBuy.classList.add( 'd-inline' );
		coEleModalProspectMarkPurchasedHeaderSpanLabelBuy.classList.remove( 'd-none' );

		coEleModalProspectMarkPurchasedHeaderSpanLabelRent.classList.remove( 'd-inline' );
		coEleModalProspectMarkPurchasedHeaderSpanLabelRent.classList.add( 'd-none' );


		coEleModalProspectMarkPurchasedBodySpanLabelBuy1.classList.add( 'd-inline' );
		coEleModalProspectMarkPurchasedBodySpanLabelBuy2.classList.add( 'd-inline' );
		coEleModalProspectMarkPurchasedBodySpanLabelBuy3.classList.add( 'd-inline' );

		coEleModalProspectMarkPurchasedBodySpanLabelBuy1.classList.remove( 'd-none' );
		coEleModalProspectMarkPurchasedBodySpanLabelBuy2.classList.remove( 'd-none' );
		coEleModalProspectMarkPurchasedBodySpanLabelBuy3.classList.remove( 'd-none' );


		coEleModalProspectMarkPurchasedBodySpanLabelRent1.classList.remove( 'd-inline' );
		coEleModalProspectMarkPurchasedBodySpanLabelRent2.classList.remove( 'd-inline' );
		coEleModalProspectMarkPurchasedBodySpanLabelRent3.classList.remove( 'd-inline' );

		coEleModalProspectMarkPurchasedBodySpanLabelRent1.classList.add( 'd-none' );
		coEleModalProspectMarkPurchasedBodySpanLabelRent2.classList.add( 'd-none' );
		coEleModalProspectMarkPurchasedBodySpanLabelRent3.classList.add( 'd-none' );


		//coEleModalProspectMarkPurchasedFooterSpanLabelBuy.classList.add( 'd-inline' );
		//coEleModalProspectMarkPurchasedFooterSpanLabelBuy.classList.remove( 'd-none' );

		//coEleModalProspectMarkPurchasedFooterSpanLabelRent.classList.remove( 'd-inline' );
		//coEleModalProspectMarkPurchasedFooterSpanLabelRent.classList.add( 'd-none' );


		if ( coEleFormModalProspectMarkPurchasedDivBookingListingInfo !== null && typeof coEleFormModalProspectMarkPurchasedDivBookingListingInfo == "object" ) {

			coEleFormModalProspectMarkPurchasedDivBookingListingInfo.innerHTML = '';


			let vUrlProspectMarkPurchasedBookingListingInfo = gHost + "/prospect/mark/purchased/booking-listing-info?id=" + coProspect.IdProspect;

			const coResponse = await fetch( vUrlProspectMarkPurchasedBookingListingInfo );
			const coData = await coResponse.json();

			if ( coData.status == "ok" ){

				coEleFormModalProspectMarkPurchasedInputAmount.value = coData.prospect_booking.booking_price;


				if ( coData.prospect_booking.booking_matching_id_listing == "0" ){

					coEleFormModalProspectMarkPurchasedDivBookingListingInfo.innerHTML = '<p class="mb-2" style="line-height: 1.25;"><i class="fas fa-angle-double-right"></i>&nbsp;Other Listing (not in the matching list)&nbsp;<i class="fas fa-angle-double-left"></p>';

				}
				else {

					coEleFormModalProspectMarkPurchasedDivBookingListingInfo.innerHTML = '<p class="mb-2" style="line-height: 1.25;">' + coData.prospect_booking.listing_ads_title + '</p><p class="mb-0" style="line-height: 1;">' + coData.prospect_booking.listing_price + '</p>';

				}


				coModalProspectInfo.hide();
				coModalProspectMarkPurchased.show();

			}

		}

	});

}

if ( coEleModalProspectInfoBtnMarkRented !== null && typeof coEleModalProspectInfoBtnMarkRented == "object" ) {

	coEleModalProspectInfoBtnMarkRented.addEventListener( 'click', async function () {
		//fProspectMarkRented();

		const coEleModalProspectMarkPurchasedHeaderSpanLabelBuy = document.getElementById('ModalProspectMarkPurchasedHeaderSpanLabelBuy');
		const coEleModalProspectMarkPurchasedHeaderSpanLabelRent = document.getElementById('ModalProspectMarkPurchasedHeaderSpanLabelRent');

		const coEleModalProspectMarkPurchasedBodySpanLabelBuy1 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelBuy1');
		const coEleModalProspectMarkPurchasedBodySpanLabelBuy2 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelBuy2');
		const coEleModalProspectMarkPurchasedBodySpanLabelBuy3 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelBuy3');


		const coEleModalProspectMarkPurchasedBodySpanLabelRent1 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelRent1');
		const coEleModalProspectMarkPurchasedBodySpanLabelRent2 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelRent2');
		const coEleModalProspectMarkPurchasedBodySpanLabelRent3 = document.getElementById('ModalProspectMarkPurchasedBodySpanLabelRent3');

		//const coEleModalProspectMarkPurchasedFooterSpanLabelBuy = document.getElementById('ModalProspectMarkPurchasedFooterSpanLabelBuy');
		//const coEleModalProspectMarkPurchasedFooterSpanLabelRent = document.getElementById('ModalProspectMarkPurchasedFooterSpanLabelRent');


		coEleModalProspectMarkPurchasedHeaderSpanLabelBuy.classList.remove( 'd-inline' );
		coEleModalProspectMarkPurchasedHeaderSpanLabelBuy.classList.add( 'd-none' );

		coEleModalProspectMarkPurchasedHeaderSpanLabelRent.classList.add( 'd-inline' );
		coEleModalProspectMarkPurchasedHeaderSpanLabelRent.classList.remove( 'd-none' );


		coEleModalProspectMarkPurchasedBodySpanLabelBuy1.classList.remove( 'd-inline' );
		coEleModalProspectMarkPurchasedBodySpanLabelBuy2.classList.remove( 'd-inline' );
		coEleModalProspectMarkPurchasedBodySpanLabelBuy3.classList.remove( 'd-inline' );

		coEleModalProspectMarkPurchasedBodySpanLabelBuy1.classList.add( 'd-none' );
		coEleModalProspectMarkPurchasedBodySpanLabelBuy2.classList.add( 'd-none' );
		coEleModalProspectMarkPurchasedBodySpanLabelBuy3.classList.add( 'd-none' );


		coEleModalProspectMarkPurchasedBodySpanLabelRent1.classList.add( 'd-inline' );
		coEleModalProspectMarkPurchasedBodySpanLabelRent2.classList.add( 'd-inline' );
		coEleModalProspectMarkPurchasedBodySpanLabelRent3.classList.add( 'd-inline' );

		coEleModalProspectMarkPurchasedBodySpanLabelRent1.classList.remove( 'd-none' );
		coEleModalProspectMarkPurchasedBodySpanLabelRent2.classList.remove( 'd-none' );
		coEleModalProspectMarkPurchasedBodySpanLabelRent3.classList.remove( 'd-none' );
		

		//coEleModalProspectMarkPurchasedFooterSpanLabelBuy.classList.remove( 'd-inline' );
		//coEleModalProspectMarkPurchasedFooterSpanLabelBuy.classList.add( 'd-none' );

		//coEleModalProspectMarkPurchasedFooterSpanLabelRent.classList.add( 'd-inline' );
		//coEleModalProspectMarkPurchasedFooterSpanLabelRent.classList.remove( 'd-none' );


		if ( coEleFormModalProspectMarkPurchasedDivBookingListingInfo !== null && typeof coEleFormModalProspectMarkPurchasedDivBookingListingInfo == "object" ) {

			coEleFormModalProspectMarkPurchasedDivBookingListingInfo.innerHTML = '';


			let vUrlProspectMarkPurchasedBookingListingInfo = gHost + "/prospect/mark/purchased/booking-listing-info?id=" + coProspect.IdProspect;

			const coResponse = await fetch( vUrlProspectMarkPurchasedBookingListingInfo );
			const coData = await coResponse.json();

			if ( coData.status == "ok" ){

				coEleFormModalProspectMarkPurchasedInputAmount.value = coData.prospect_booking.booking_price;


				if ( coData.prospect_booking.booking_matching_id_listing == "0" ){

					coEleFormModalProspectMarkPurchasedDivBookingListingInfo.innerHTML = '<p class="mb-2" style="line-height: 1.25;"><i class="fas fa-angle-double-right"></i>&nbsp;Other Listing (not in the matching list)&nbsp;<i class="fas fa-angle-double-left"></p>';

				}
				else {

					coEleFormModalProspectMarkPurchasedDivBookingListingInfo.innerHTML = '<p class="mb-2" style="line-height: 1.25;">' + coData.prospect_booking.listing_ads_title + '</p><p class="mb-0" style="line-height: 1;">' + coData.prospect_booking.listing_price + '</p>';

				}


				coModalProspectInfo.hide();
				coModalProspectMarkPurchased.show();

			}

		}

	});

}

if ( coEleFormModalProspectMarkBooking !== null && typeof coEleFormModalProspectMarkBooking == "object" ){

	coEleFormModalProspectMarkBooking.addEventListener( 'submit', function () {
		fProspectMarkBooking();
	});

}

if ( coEleFormModalProspectMarkPurchased !== null && typeof coEleFormModalProspectMarkPurchased == "object" ){

	coEleFormModalProspectMarkPurchased.addEventListener( 'submit', function () {
		fProspectMarkPurchased();
	});

}


async function fHideProspectInfo () {

	fIsAlive();
	

	if ( coEleModalProspectInfo !== null && typeof coEleModalProspectInfo == "object" ){

		if ( coEleModalProspectInfoDivColEdit !== null && typeof coEleModalProspectInfoDivColEdit == "object" ) 
			coEleModalProspectInfoDivColEdit.classList.add('d-none');

		if ( coEleModalProspectInfoDivColDelete !== null && typeof coEleModalProspectInfoDivColDelete == "object" )
			coEleModalProspectInfoDivColDelete.classList.add('d-none');

		if ( coEleModalProspectInfoDivColPublish !== null && typeof coEleModalProspectInfoDivColPublish == "object" ) 
			coEleModalProspectInfoDivColPublish.classList.add('d-none');

		if ( coEleModalProspectInfoDivColReMatching !== null && typeof coEleModalProspectInfoDivColReMatching == "object" )
			coEleModalProspectInfoDivColReMatching.classList.add('d-none');

		if ( coEleModalProspectInfoDivColRepublish !== null && typeof coEleModalProspectInfoDivColRepublish == "object" ) 
			coEleModalProspectInfoDivColRepublish.classList.add('d-none');

		if ( coEleModalProspectInfoDivColUnpublish !== null && typeof coEleModalProspectInfoDivColUnpublish == "object" )
			coEleModalProspectInfoDivColUnpublish.classList.add('d-none');

		if ( coEleModalProspectInfoDivColReactivate !== null && typeof coEleModalProspectInfoDivColReactivate == "object" )
			coEleModalProspectInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalProspectInfoDivColDeactivate !== null && typeof coEleModalProspectInfoDivColDeactivate == "object" ) 
			coEleModalProspectInfoDivColDeactivate.classList.add('d-none');

		if ( coEleModalProspectInfoDivColMarkUnbooked !== null && typeof coEleModalProspectInfoDivColMarkUnbooked == "object" ) 
			coEleModalProspectInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalProspectInfoDivColMarkBooking !== null && typeof coEleModalProspectInfoDivColMarkBooking == "object" ) 
			coEleModalProspectInfoDivColMarkBooking.classList.add('d-none');

		if ( coEleModalProspectInfoDivColMarkPurchased !== null && typeof coEleModalProspectInfoDivColMarkPurchased == "object" )
			coEleModalProspectInfoDivColMarkPurchased.classList.add('d-none');

		if ( coEleModalProspectInfoDivColMarkRented !== null && typeof coEleModalProspectInfoDivColMarkRented == "object" )
			coEleModalProspectInfoDivColMarkRented.classList.add('d-none');

		
		coProspect.IdProspect 		=	null;
		coProspect.Ownership 		= 	null;
		coProspect.Modus 			=	null;
		coProspect.ModusDetail		=	null;
		coProspect.Status 			=	null;

		coProspect.coStatusDetail	= 	null;
		coProspect.StatusDetail 	= 	null;

		coProspect.BgColor 			= 	null;
		coProspect.RegNo 			= 	null;

		
		coEleModalProspectInfoBody.innerHTML = '';


	}

}


async function fShowProspectInfo ( pProspectRegNo, pIdProspect, pProspectBgColor ) {

	fIsAlive();

	
	if ( coEleModalProspectInfo !== null && typeof coEleModalProspectInfo == "object" ){


		if ( coEleModalProspectInfo_BtnViewMatchingListingMobile !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingMobile == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.remove('d-block');
			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.add('d-none');

		}

		if ( coEleModalProspectInfo_BtnViewMatchingListingDesktop !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingDesktop == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.remove('d-md-block');
			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.add('d-md-none');

		}

		if ( coEleModalProspectInfoDivColEdit !== null && typeof coEleModalProspectInfoDivColEdit == "object" ) 
			coEleModalProspectInfoDivColEdit.classList.add('d-none');

		if ( coEleModalProspectInfoDivColDelete !== null && typeof coEleModalProspectInfoDivColDelete == "object" )
			coEleModalProspectInfoDivColDelete.classList.add('d-none');

		if ( coEleModalProspectInfoDivColPublish !== null && typeof coEleModalProspectInfoDivColPublish == "object" ) 
			coEleModalProspectInfoDivColPublish.classList.add('d-none');

		if ( coEleModalProspectInfoDivColReMatching !== null && typeof coEleModalProspectInfoDivColReMatching == "object" )
			coEleModalProspectInfoDivColReMatching.classList.add('d-none');

		if ( coEleModalProspectInfoDivColRepublish !== null && typeof coEleModalProspectInfoDivColRepublish == "object" ) 
			coEleModalProspectInfoDivColRepublish.classList.add('d-none');

		if ( coEleModalProspectInfoDivColUnpublish !== null && typeof coEleModalProspectInfoDivColUnpublish == "object" )
			coEleModalProspectInfoDivColUnpublish.classList.add('d-none');

		if ( coEleModalProspectInfoDivColReactivate !== null && typeof coEleModalProspectInfoDivColReactivate == "object" )
			coEleModalProspectInfoDivColReactivate.classList.add('d-none');

		if ( coEleModalProspectInfoDivColDeactivate !== null && typeof coEleModalProspectInfoDivColDeactivate == "object" ) 
			coEleModalProspectInfoDivColDeactivate.classList.add('d-none');

		if ( coEleModalProspectInfoDivColMarkUnbooked !== null && typeof coEleModalProspectInfoDivColMarkUnbooked == "object" ) 
			coEleModalProspectInfoDivColMarkUnbooked.classList.add('d-none');

		if ( coEleModalProspectInfoDivColMarkBooking !== null && typeof coEleModalProspectInfoDivColMarkBooking == "object" ) 
			coEleModalProspectInfoDivColMarkBooking.classList.add('d-none');

		if ( coEleModalProspectInfoDivColMarkPurchased !== null && typeof coEleModalProspectInfoDivColMarkPurchased == "object" )
			coEleModalProspectInfoDivColMarkPurchased.classList.add('d-none');

		if ( coEleModalProspectInfoDivColMarkRented !== null && typeof coEleModalProspectInfoDivColMarkRented == "object" )
			coEleModalProspectInfoDivColMarkRented.classList.add('d-none');

		
		coProspect.IdProspect 		=	null;
		coProspect.Ownership 		= 	null;
		coProspect.Modus 			=	null;
		coProspect.ModusDetail		=	null;
		coProspect.Status 			=	null;

		coProspect.coStatusDetail	= 	null;
		coProspect.StatusDetail 	= 	null;

		coProspect.BgColor 			= 	null;
		coProspect.RegNo 			= 	null;


		let vUrlProspectInfo = gHost + "/prospect/info?id=" + pIdProspect + "&bgcolor=" + encodeURIComponent( pProspectBgColor );

		const coResponse = await fetch( vUrlProspectInfo );
		const coData = await coResponse.text();
//console.log(coData);
		
		coEleModalProspectInfoBody.innerHTML = '';


		if ( coData == "0" ){

			coEleModalProspectInfoBody.innerHTML = '<div class="text-center mt-5"><h5 class="fw-bold">No result found.</h5><p>Please modify your search.</p><br><br>&nbsp;</div>';

		}
		else {

			coEleModalProspectInfoBody.innerHTML = coData;

			coProspect.IdProspect 		=	pIdProspect;
			coProspect.Ownership 		= 	( document.getElementById( 'ModalProspectInfo_DivProspectOwnership_' + pIdProspect ) ).innerText.trim().toUpperCase();
			coProspect.Modus 			=	( document.getElementById( 'ModalProspectInfo_DivProspectModus_' + pIdProspect ) ).innerText.trim().toUpperCase();
			coProspect.ModusDetail		=	( document.getElementById( 'ModalProspectInfo_DivProspectModusDetail_' + pIdProspect ) ).innerText.trim().toUpperCase();
			coProspect.Status 			=	( document.getElementById( 'ModalProspectInfo_DivProspectStatus_' + pIdProspect ) ).innerText.trim().toUpperCase();


			coProspect.coStatusDetail 	= 	document.getElementById( 'ModalProspectInfo_DivProspectStatusDetail_' + pIdProspect )

			coProspect.StatusDetail 	= 	coProspect.coStatusDetail.innerText.trim().toUpperCase();

			coProspect.BgColor 			= 	pProspectBgColor;
			coProspect.RegNo 			= 	pProspectRegNo;


			if ( coProspect.Ownership == 'YES' ){

				if ( coEleModalProspectInfoHrefEdit !== null && typeof coEleModalProspectInfoHrefEdit == "object" ){

					coEleModalProspectInfoHrefEdit.href = gHost + "/prospect/update?id=" + coProspect.IdProspect + "&referer=" + encodeURIComponent( "/profile?op=prospect" );

				}

				if ( coEleModalProspectInfo_BtnViewMatchingListingMobile !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingMobile == "object"
					&&
						(
							coProspect.StatusDetail == 'PUBLISHED'		||
							coProspect.StatusDetail == 'REPUBLISHED'	||
							coProspect.StatusDetail == 'BOOKING'		||
							coProspect.StatusDetail == 'UNBOOKED'		||
							coProspect.StatusDetail == 'PURCHASED'
						)
				){

					coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.add('d-block');
					coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.remove('d-none');

				}

				if ( coEleModalProspectInfo_BtnViewMatchingListingDesktop !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingDesktop == "object"
					&&
						(
							coProspect.StatusDetail == 'PUBLISHED'		||
							coProspect.StatusDetail == 'REPUBLISHED'	||
							coProspect.StatusDetail == 'BOOKING'		||
							coProspect.StatusDetail == 'UNBOOKED'		||
							coProspect.StatusDetail == 'PURCHASED'
						)
				){

					coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.add('d-md-block');
					coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.remove('d-md-none');

				}

				if ( coEleModalProspectInfoDivColEdit !== null && typeof coEleModalProspectInfoDivColEdit == "object"
					&&
						(
							coProspect.StatusDetail != 'DEACTIVATED'		&&
							coProspect.StatusDetail != 'BOOKING'			&&
							coProspect.StatusDetail != 'PURCHASED'
						)
					){

					coEleModalProspectInfoDivColEdit.classList.remove('d-none');

				}

				
				if ( coEleModalProspectInfoDivColDelete !== null && typeof coEleModalProspectInfoDivColDelete == "object" &&
						(
							coProspect.StatusDetail == 'DRAFT'
						)
					) {

					coEleModalProspectInfoDivColDelete.classList.remove('d-none');

				}

				
				if ( coEleModalProspectInfoDivColPublish !== null && typeof coEleModalProspectInfoDivColPublish == "object" &&
						(
							coProspect.StatusDetail == 'DRAFT'
						)
					) {

					coEleModalProspectInfoDivColPublish.classList.remove('d-none');

				}
				
				if ( coEleModalProspectInfoDivColRepublish !== null && typeof coEleModalProspectInfoDivColRepublish == "object"
					&&
						(
							coProspect.StatusDetail == 'EXPIRED'		||
							coProspect.StatusDetail == 'UNPUBLISHED'	||
							coProspect.StatusDetail == 'REACTIVATED'	||
							coProspect.StatusDetail == 'UNBOOKED'
						)
					) {
					
					coEleModalProspectInfoDivColRepublish.classList.remove('d-none');

				}
				
				if ( coEleModalProspectInfoDivColUnpublish !== null && typeof coEleModalProspectInfoDivColUnpublish == "object"
					&&
						(
							coProspect.StatusDetail == 'PUBLISHED'		||
							coProspect.StatusDetail == 'REPUBLISHED'
						)
					) {

					coEleModalProspectInfoDivColUnpublish.classList.remove('d-none');

				}
				
				if ( coEleModalProspectInfoDivColReMatching !== null && typeof coEleModalProspectInfoDivColReMatching == "object"
					&&
						(
							coProspect.StatusDetail == 'PUBLISHED'		||
							coProspect.StatusDetail == 'REPUBLISHED'
						)
					) {

					coEleModalProspectInfoDivColReMatching.classList.remove('d-none');

				}
				
				if ( coEleModalProspectInfoDivColReactivate !== null && typeof coEleModalProspectInfoDivColReactivate == "object"
					&&
						coProspect.StatusDetail == 'DEACTIVATED'
					) {

					coEleModalProspectInfoDivColReactivate.classList.remove('d-none');

				}
				
				if ( coEleModalProspectInfoDivColDeactivate !== null && typeof coEleModalProspectInfoDivColDeactivate == "object"
					&&
						(
							coProspect.StatusDetail == 'EXPIRED'		||
							coProspect.StatusDetail == 'UNPUBLISHED'	||
							coProspect.StatusDetail == 'REACTIVATED'	||
							coProspect.StatusDetail == 'UNBOOKED'
						)
					) {

					coEleModalProspectInfoDivColDeactivate.classList.remove('d-none');

				}
				
				if ( coEleModalProspectInfoDivColMarkUnbooked !== null && typeof coEleModalProspectInfoDivColMarkUnbooked == "object"
					&&
						(
							coProspect.StatusDetail == 'BOOKING'
						)
					) {

					coEleModalProspectInfoDivColMarkUnbooked.classList.remove('d-none');

				}
				
				if ( coEleModalProspectInfoDivColMarkBooking !== null && typeof coEleModalProspectInfoDivColMarkBooking == "object" &&
						(
							coProspect.StatusDetail == 'PUBLISHED'	||
							coProspect.StatusDetail == 'EXPIRED'		||
							coProspect.StatusDetail == 'REPUBLISHED'	||
							coProspect.StatusDetail == 'UNPUBLISHED'	||
							coProspect.StatusDetail == 'REACTIVATED'	||
							coProspect.StatusDetail == 'UNBOOKED'
						)
					) {

					coEleModalProspectInfoDivColMarkBooking.classList.remove('d-none');

				}
				
				if ( coEleModalProspectInfoDivColMarkPurchased !== null && typeof coEleModalProspectInfoDivColMarkPurchased == "object"
					&&
						coProspect.StatusDetail == 'BOOKING'
					&&
						coProspect.Modus == 'WTB'
					) {

					coEleModalProspectInfoDivColMarkPurchased.classList.remove('d-none');

				}
				
				if ( coEleModalProspectInfoDivColMarkRented !== null && typeof coEleModalProspectInfoDivColMarkRented == "object"
					&&
						coProspect.StatusDetail == 'BOOKING'
					&&
						coProspect.Modus == 'WTR'
					) {

					coEleModalProspectInfoDivColMarkRented.classList.remove('d-none');

				}


				if (
					coProspect.StatusDetail == 'PUBLISHED'
					||
					coProspect.StatusDetail == 'REPUBLISHED'
					||
					coProspect.StatusDetail == 'BOOKING'
					||
					coProspect.StatusDetail == 'UNBOOKED'
					||
					coProspect.StatusDetail == 'PURCHASED'
				){

					let oModalProspectInfo_DivProspectMatching = document.getElementById('ModalProspectInfo_DivProspectMatching_' + coProspect.IdProspect);

					if ( oModalProspectInfo_DivProspectMatching !== null && typeof oModalProspectInfo_DivProspectMatching == "object" ){

						let vUrlProspectMatchingListing = gHost + "/prospect/matching/listing?id=" + coProspect.IdProspect + "&bgcolor=" + encodeURIComponent( coProspect.BgColor ) + "&prospect_reg_no=" + encodeURIComponent( coProspect.RegNo );

						const coResponseMatchingListing = await fetch( vUrlProspectMatchingListing );
						const coDataMatchingListing = await coResponseMatchingListing.text();
//console.log(coDataMatchingListing);

						oModalProspectInfo_DivProspectMatching.innerHTML = '';


						if ( 
							coDataMatchingListing == "0"
							||
							coDataMatchingListing == "invalid"
						){

							oModalProspectInfo_DivProspectMatching.innerHTML = coHtml_DivProspectMatching_None;

						}
						else {

							oModalProspectInfo_DivProspectMatching.innerHTML = coDataMatchingListing;

						}

					}

				}


			}
			else {

			}



		}


		coModalProspectInfo.show();

	}


}


async function fProspectDelete(){

	fIsAlive();
	

	let vUrlProspectDelete = gHost + "/prospect/delete?id=" + coProspect.IdProspect;
//console.log(vUrlProspectDelete);

	const coResponse = await fetch( vUrlProspectDelete )

	const coData = await coResponse.json();
//console.log( coData );

	if (
		coData.status = "ok"
	){

		let oDivProfileProspect = document.getElementById( 'DivProfileProspect_' + coProspect.IdProspect );

		if ( oDivProfileProspect !== null && typeof oDivProfileProspect == "object" ){

			oDivProfileProspect.remove();

		}
			
		coModalProspectInfo.hide();

	}
	else {

	}

}


async function fProspectPublish(){

	fIsAlive();
	

	let vUrlProspectPublish = gHost + "/prospect/publish?id=" + coProspect.IdProspect;
//console.log(vUrlProspectPublish);

	const coResponse = await fetch( vUrlProspectPublish )

	const coData = await coResponse.json();
//console.log( coData );

	if (
		coData.status = "ok"
	){

		let oBodyProspectCardResultRibbonPublished = document.getElementById('BodyProspectCardResultRibbonPublished_' + coProspect.IdProspect);
		
		if ( oBodyProspectCardResultRibbonPublished !== null && typeof oBodyProspectCardResultRibbonPublished == "object" ) oBodyProspectCardResultRibbonPublished.classList.remove('d-none');


		let oModalProspectInfo_RibbonPublished = document.getElementById('ModalProspectInfo_RibbonPublished_' + coProspect.IdProspect);
		
		if ( oModalProspectInfo_RibbonPublished !== null && typeof oModalProspectInfo_RibbonPublished == "object" ) oModalProspectInfo_RibbonPublished.classList.remove('d-none');


		if (
			coProspect.StatusDetail == 'DRAFT'
		){

			let oBodyProspectCardResultRibbonDraft = document.getElementById('BodyProspectCardResultRibbonDraft_' + coProspect.IdProspect)
			
			if ( oBodyProspectCardResultRibbonDraft !== null && typeof oBodyProspectCardResultRibbonDraft == "object" ) oBodyProspectCardResultRibbonDraft.classList.add('d-none');


			let oModalProspectInfo_RibbonDraft = document.getElementById('ModalProspectInfo_RibbonDraft_' + coProspect.IdProspect);
			
			if ( oModalProspectInfo_RibbonDraft !== null && typeof oModalProspectInfo_RibbonDraft == "object" ) oModalProspectInfo_RibbonDraft.classList.add('d-none');

		}


		if (
			coProspect.StatusDetail == 'UNPUBLISHED'	||
			coProspect.StatusDetail == 'REACTIVATED'
		){

			let oBodyProspectCardResultRibbonUnpublished = document.getElementById('BodyProspectCardResultRibbonUnpublished_' + coProspect.IdProspect)
			
			if ( oBodyProspectCardResultRibbonUnpublished !== null && typeof oBodyProspectCardResultRibbonUnpublished == "object" ) oBodyProspectCardResultRibbonUnpublished.classList.add('d-none');


			let oModalProspectInfo_RibbonUnpublished = document.getElementById('ModalProspectInfo_RibbonUnpublished_' + coProspect.IdProspect);
			
			if ( oModalProspectInfo_RibbonUnpublished !== null && typeof oModalProspectInfo_RibbonUnpublished == "object" ) oModalProspectInfo_RibbonUnpublished.classList.add('d-none');

		}


		if ( coEleModalProspectInfo_BtnViewMatchingListingMobile !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingMobile == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.add('d-block');
			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.remove('d-none');

		}

		if ( coEleModalProspectInfo_BtnViewMatchingListingDesktop !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingDesktop == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.add('d-md-block');
			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.remove('d-md-none');

		}


		if ( coEleModalProspectInfoDivColEdit !== null && typeof coEleModalProspectInfoDivColEdit == "object" ) coEleModalProspectInfoDivColEdit.classList.remove('d-none');


		if ( coEleModalProspectInfoDivColDelete !== null && typeof coEleModalProspectInfoDivColDelete == "object" ) coEleModalProspectInfoDivColDelete.classList.add('d-none');

				
		if ( coEleModalProspectInfoDivColPublish !== null && typeof coEleModalProspectInfoDivColPublish == "object" ) coEleModalProspectInfoDivColPublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColRepublish !== null && typeof coEleModalProspectInfoDivColRepublish == "object" ) coEleModalProspectInfoDivColRepublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColUnpublish !== null && typeof coEleModalProspectInfoDivColUnpublish == "object" ) coEleModalProspectInfoDivColUnpublish.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColReMatching !== null && typeof coEleModalProspectInfoDivColReMatching == "object" )coEleModalProspectInfoDivColReMatching.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColReactivate !== null && typeof coEleModalProspectInfoDivColReactivate == "object" ) coEleModalProspectInfoDivColReactivate.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColDeactivate !== null && typeof coEleModalProspectInfoDivColDeactivate == "object" ) coEleModalProspectInfoDivColDeactivate.classList.add('d-none');


		if ( coEleModalProspectInfoDivColMarkUnbooked !== null && typeof coEleModalProspectInfoDivColMarkUnbooked == "object" ) coEleModalProspectInfoDivColMarkUnbooked.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkBooking !== null && typeof coEleModalProspectInfoDivColMarkBooking == "object" )coEleModalProspectInfoDivColMarkBooking.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColMarkPurchased !== null && typeof coEleModalProspectInfoDivColMarkPurchased == "object" ) coEleModalProspectInfoDivColMarkPurchased.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkRented !== null && typeof coEleModalProspectInfoDivColMarkRented == "object" ) coEleModalProspectInfoDivColMarkRented.classList.add('d-none');


		coProspect.coStatusDetail.innerText = 'PUBLISHED';
		coProspect.StatusDetail = 	coProspect.coStatusDetail.innerText.trim().toUpperCase();


		let oModalProspectInfo_AgentInfo_ParaPublishDateMobile = document.getElementById('ModalProspectInfo_AgentInfo_ParaPublishDateMobile_' + + coProspect.IdProspect);
		
		if ( oModalProspectInfo_AgentInfo_ParaPublishDateMobile !== null && typeof oModalProspectInfo_AgentInfo_ParaPublishDateMobile == "object" ) oModalProspectInfo_AgentInfo_ParaPublishDateMobile.innerText = coData.prospect.publish_dt;

		let oModalProspectInfo_AgentInfo_ParaPublishDateDesktop = document.getElementById('ModalProspectInfo_AgentInfo_ParaPublishDateDesktop_' + + coProspect.IdProspect);
		
		if ( oModalProspectInfo_AgentInfo_ParaPublishDateDesktop !== null && typeof oModalProspectInfo_AgentInfo_ParaPublishDateDesktop == "object" ) oModalProspectInfo_AgentInfo_ParaPublishDateDesktop.innerText = coData.prospect.publish_dt;


		let oBodyProspectCardResultDivColMatching = document.getElementById('BodyProspectCardResultDivColMatching_' + coProspect.IdProspect);
		
		if ( oBodyProspectCardResultDivColMatching !== null && typeof oBodyProspectCardResultDivColMatching == "object" ){

			if (
				coData.prospect.matching_count > 0 
			){

				oBodyProspectCardResultDivColMatching.innerHTML = '<i class="fas fa-heart me-1" style="font-size: 0.9rem; color: #00b760;"></i><span class="me-1">' + coData.prospect.matching_count + '</span>';

			}
			else {

				oBodyProspectCardResultDivColMatching.innerHTML = '<i class="far fa-heart me-1"></i><span class="me-1">' + coData.prospect.matching_count + '</span>';

			}

		}


		let oBodyProspectCardResultDivRowMatching = document.getElementById('BodyProspectCardResultDivRowMatching_' + coProspect.IdProspect);

		if ( oBodyProspectCardResultDivRowMatching !== null && typeof oBodyProspectCardResultDivRowMatching == "object" )oBodyProspectCardResultDivRowMatching.classList.remove('d-none');


		let oBodyProspectCardResultDivRowPublishDate = document.getElementById('BodyProspectCardResultDivRowPublishDate_' + coProspect.IdProspect);
	
		if ( oBodyProspectCardResultDivRowPublishDate !== null && typeof oBodyProspectCardResultDivRowPublishDate == "object" ){

			oBodyProspectCardResultDivRowPublishDate.innerText = coData.prospect.publish_dt;

			oBodyProspectCardResultDivRowPublishDate.classList.remove('d-none');

		}


		if (
			coProspect.StatusDetail == 'PUBLISHED'
		){

			let oModalProspectInfo_DivProspectMatching = document.getElementById('ModalProspectInfo_DivProspectMatching_' + coProspect.IdProspect);

			if ( oModalProspectInfo_DivProspectMatching !== null && typeof oModalProspectInfo_DivProspectMatching == "object" ){
			
				if (
					coData.prospect.matching_count > 0 
				){

					let vUrlProspectMatchingListing = gHost + "/prospect/matching/listing?id=" + coProspect.IdProspect + "&bgcolor=" + encodeURIComponent( coProspect.BgColor ) + "&prospect_reg_no=" + encodeURIComponent( coProspect.RegNo ) + '&crithit=YES';

					const coResponseMatchingListing = await fetch( vUrlProspectMatchingListing );
					const coDataMatchingListing = await coResponseMatchingListing.text();
//console.log(coDataMatchingListing);
					
					oModalProspectInfo_DivProspectMatching.innerHTML = '';


					if ( 
						coDataMatchingListing == "0"
						||
						coDataMatchingListing == "invalid"
					){

						oModalProspectInfo_DivProspectMatching.innerHTML = coHtml_DivProspectMatching_None;

					}
					else {

						oModalProspectInfo_DivProspectMatching.innerHTML = coDataMatchingListing;

					}

				}
				else {

					oModalProspectInfo_DivProspectMatching.innerHTML = coHtml_DivProspectMatching_None;
					
				}

			}

		}

	
	}
	else {

	}

}


async function fProspectReMatching(){

	fIsAlive();

	let oModalProspectInfo_DivProspectMatching = document.getElementById('ModalProspectInfo_DivProspectMatching_' + coProspect.IdProspect);

	if ( oModalProspectInfo_DivProspectMatching !== null && typeof oModalProspectInfo_DivProspectMatching == "object" ){


		oModalProspectInfo_DivProspectMatching.innerHTML = coHtml_DivProspectMatching_ReMatchingProc;


		let vUrlProspectMatchingProc = gHost + "/prospect/matching/proc?id=" + coProspect.IdProspect + "&bgcolor=" + encodeURIComponent( coProspect.BgColor ) + "&prospect_reg_no=" + encodeURIComponent( coProspect.RegNo );

		const coResponseMatchingProc = await fetch( vUrlProspectMatchingProc );
		const coDataMatchingProc = await coResponseMatchingProc.json();
//console.log( coDataMatchingProc );

		if (
			coDataMatchingProc.status = 'ok'
			&&
			coDataMatchingProc.prospect.matching_count > 0
		){

			let vUrlProspectMatchingListing = gHost + "/prospect/matching/listing?id=" + coProspect.IdProspect + "&bgcolor=" + encodeURIComponent( coProspect.BgColor ) + "&prospect_reg_no=" + encodeURIComponent( coProspect.RegNo );

			const coResponseMatchingListing = await fetch( vUrlProspectMatchingListing );
			const coDataMatchingListing = await coResponseMatchingListing.text();
//console.log(coDataMatchingListing);

			oModalProspectInfo_DivProspectMatching.innerHTML = '';


			if ( 
				coDataMatchingListing == "0"
				||
				coDataMatchingListing == "invalid"
			){

				oModalProspectInfo_DivProspectMatching.innerHTML = coHtml_DivProspectMatching_None;

			}
			else {

				oModalProspectInfo_DivProspectMatching.innerHTML = coDataMatchingListing;

			}

		}
		else {

			oModalProspectInfo_DivProspectMatching.innerHTML = coHtml_DivProspectMatching_None;

		}


	}

}

async function fProspectRepublish(){

	fIsAlive();
	

	let vUrlProspectRepublish = gHost + "/prospect/republish?id=" + coProspect.IdProspect;
//console.log(vUrlProspectRepublish);

	const coResponse = await fetch( vUrlProspectRepublish )

	const coData = await coResponse.json();
//console.log( coData );

	if (
		coData.status = "ok"
	){

		let oBodyProspectCardResultRibbonRepublished = document.getElementById('BodyProspectCardResultRibbonRepublished_' + coProspect.IdProspect);
		
		if ( oBodyProspectCardResultRibbonRepublished !== null && typeof oBodyProspectCardResultRibbonRepublished == "object" ) oBodyProspectCardResultRibbonRepublished.classList.remove('d-none');


		let oModalProspectInfo_RibbonRepublished = document.getElementById('ModalProspectInfo_RibbonRepublished_' + coProspect.IdProspect);
		
		if ( oModalProspectInfo_RibbonRepublished !== null && typeof oModalProspectInfo_RibbonRepublished == "object" ) oModalProspectInfo_RibbonRepublished.classList.remove('d-none');


		if (
			coProspect.StatusDetail == 'UNPUBLISHED'	||
			coProspect.StatusDetail == 'REACTIVATED'
		){

			let oBodyProspectCardResultRibbonUnpublished = document.getElementById('BodyProspectCardResultRibbonUnpublished_' + coProspect.IdProspect)
			
			if ( oBodyProspectCardResultRibbonUnpublished !== null && typeof oBodyProspectCardResultRibbonUnpublished == "object" ) oBodyProspectCardResultRibbonUnpublished.classList.add('d-none');


			let oModalProspectInfo_RibbonUnpublished = document.getElementById('ModalProspectInfo_RibbonUnpublished_' + coProspect.IdProspect);
			
			if ( oModalProspectInfo_RibbonUnpublished !== null && typeof oModalProspectInfo_RibbonUnpublished == "object" ) oModalProspectInfo_RibbonUnpublished.classList.add('d-none');

		}


		if ( coEleModalProspectInfo_BtnViewMatchingListingMobile !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingMobile == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.add('d-block');
			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.remove('d-none');

		}

		if ( coEleModalProspectInfo_BtnViewMatchingListingDesktop !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingDesktop == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.add('d-md-block');
			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.remove('d-md-none');

		}


		if ( coEleModalProspectInfoDivColEdit !== null && typeof coEleModalProspectInfoDivColEdit == "object" ) coEleModalProspectInfoDivColEdit.classList.remove('d-none');


		if ( coEleModalProspectInfoDivColDelete !== null && typeof coEleModalProspectInfoDivColDelete == "object" ) coEleModalProspectInfoDivColDelete.classList.add('d-none');

				
		if ( coEleModalProspectInfoDivColPublish !== null && typeof coEleModalProspectInfoDivColPublish == "object" ) coEleModalProspectInfoDivColPublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColRepublish !== null && typeof coEleModalProspectInfoDivColRepublish == "object" ) coEleModalProspectInfoDivColRepublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColUnpublish !== null && typeof coEleModalProspectInfoDivColUnpublish == "object" ) coEleModalProspectInfoDivColUnpublish.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColReMatching !== null && typeof coEleModalProspectInfoDivColReMatching == "object" )coEleModalProspectInfoDivColReMatching.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColReactivate !== null && typeof coEleModalProspectInfoDivColReactivate == "object" ) coEleModalProspectInfoDivColReactivate.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColDeactivate !== null && typeof coEleModalProspectInfoDivColDeactivate == "object" ) coEleModalProspectInfoDivColDeactivate.classList.add('d-none');


		if ( coEleModalProspectInfoDivColMarkUnbooked !== null && typeof coEleModalProspectInfoDivColMarkUnbooked == "object" ) coEleModalProspectInfoDivColMarkUnbooked.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkBooking !== null && typeof coEleModalProspectInfoDivColMarkBooking == "object" )coEleModalProspectInfoDivColMarkBooking.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColMarkPurchased !== null && typeof coEleModalProspectInfoDivColMarkPurchased == "object" ) coEleModalProspectInfoDivColMarkPurchased.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkRented !== null && typeof coEleModalProspectInfoDivColMarkRented == "object" ) coEleModalProspectInfoDivColMarkRented.classList.add('d-none');


		coProspect.coStatusDetail.innerText = 'REPUBLISHED';
		coProspect.StatusDetail = 	coProspect.coStatusDetail.innerText.trim().toUpperCase();


		let oModalProspectInfo_AgentInfo_ParaPublishDateMobile = document.getElementById('ModalProspectInfo_AgentInfo_ParaPublishDateMobile_' + + coProspect.IdProspect);
		
		if ( oModalProspectInfo_AgentInfo_ParaPublishDateMobile !== null && typeof oModalProspectInfo_AgentInfo_ParaPublishDateMobile == "object" ) oModalProspectInfo_AgentInfo_ParaPublishDateMobile.innerText = coData.prospect.publish_dt;

		let oModalProspectInfo_AgentInfo_ParaPublishDateDesktop = document.getElementById('ModalProspectInfo_AgentInfo_ParaPublishDateDesktop_' + + coProspect.IdProspect);
		
		if ( oModalProspectInfo_AgentInfo_ParaPublishDateDesktop !== null && typeof oModalProspectInfo_AgentInfo_ParaPublishDateDesktop == "object" ) oModalProspectInfo_AgentInfo_ParaPublishDateDesktop.innerText = coData.prospect.publish_dt;


		let oBodyProspectCardResultDivColMatching = document.getElementById('BodyProspectCardResultDivColMatching_' + coProspect.IdProspect);
		
		if ( oBodyProspectCardResultDivColMatching !== null && typeof oBodyProspectCardResultDivColMatching == "object" ){

			if (
				coData.prospect.matching_count > 0 
			){

				oBodyProspectCardResultDivColMatching.innerHTML = '<i class="fas fa-heart me-1" style="font-size: 0.9rem; color: #00b760;"></i><span class="me-1">' + coData.prospect.matching_count + '</span>';

			}
			else {

				oBodyProspectCardResultDivColMatching.innerHTML = '<i class="far fa-heart me-1"></i><span class="me-1">' + coData.prospect.matching_count + '</span>';

			}

		}


		let oBodyProspectCardResultDivRowMatching = document.getElementById('BodyProspectCardResultDivRowMatching_' + coProspect.IdProspect);

		if ( oBodyProspectCardResultDivRowMatching !== null && typeof oBodyProspectCardResultDivRowMatching == "object" )oBodyProspectCardResultDivRowMatching.classList.remove('d-none');


		let oBodyProspectCardResultDivRowPublishDate = document.getElementById('BodyProspectCardResultDivRowPublishDate_' + coProspect.IdProspect);
	
		if ( oBodyProspectCardResultDivRowPublishDate !== null && typeof oBodyProspectCardResultDivRowPublishDate == "object" ){

			oBodyProspectCardResultDivRowPublishDate.innerText = coData.prospect.publish_dt;

			oBodyProspectCardResultDivRowPublishDate.classList.remove('d-none');

		}


		if (
			coProspect.StatusDetail == 'REPUBLISHED'
		){

			let oModalProspectInfo_DivProspectMatching = document.getElementById('ModalProspectInfo_DivProspectMatching_' + coProspect.IdProspect);

			if ( oModalProspectInfo_DivProspectMatching !== null && typeof oModalProspectInfo_DivProspectMatching == "object" ){
			
				if (
					coData.prospect.matching_count > 0 
				){

					let vUrlProspectMatchingListing = gHost + "/prospect/matching/listing?id=" + coProspect.IdProspect + "&bgcolor=" + encodeURIComponent( coProspect.BgColor ) + "&prospect_reg_no=" + encodeURIComponent( coProspect.RegNo ) + '&crithit=YES';

					const coResponseMatchingListing = await fetch( vUrlProspectMatchingListing );
					const coDataMatchingListing = await coResponseMatchingListing.text();
//console.log(coDataMatchingListing);
					
					oModalProspectInfo_DivProspectMatching.innerHTML = '';


					if ( 
						coDataMatchingListing == "0"
						||
						coDataMatchingListing == "invalid"
					){

						oModalProspectInfo_DivProspectMatching.innerHTML = coHtml_DivProspectMatching_None;

					}
					else {

						oModalProspectInfo_DivProspectMatching.innerHTML = coDataMatchingListing;

					}

				}
				else {

					oModalProspectInfo_DivProspectMatching.innerHTML = coHtml_DivProspectMatching_None;
					
				}

			}

		}

	
	}
	else {

	}

}

async function fProspectUnpublish(){

	fIsAlive();
	

	let vUrlProspectUnpublish = gHost + "/prospect/unpublish?id=" + coProspect.IdProspect;
//console.log(vUrlProspectUnpublish);

	const coResponse = await fetch( vUrlProspectUnpublish )

	const coData = await coResponse.json();
//console.log( coData );

	if (
		coData.status = "ok"
	){

		let oBodyProspectCardResultRibbonUnpublished = document.getElementById('BodyProspectCardResultRibbonUnpublished_' + coProspect.IdProspect);
		
		if ( oBodyProspectCardResultRibbonUnpublished !== null && typeof oBodyProspectCardResultRibbonUnpublished == "object" ) oBodyProspectCardResultRibbonUnpublished.classList.remove('d-none');


		let oModalProspectInfo_RibbonUnpublished = document.getElementById('ModalProspectInfo_RibbonUnpublished_' + coProspect.IdProspect);
		
		if ( oModalProspectInfo_RibbonUnpublished !== null && typeof oModalProspectInfo_RibbonUnpublished == "object" ) oModalProspectInfo_RibbonUnpublished.classList.remove('d-none');


		if (
			coProspect.StatusDetail == 'PUBLISHED'
		){

			let oBodyProspectCardResultRibbonPublished = document.getElementById('BodyProspectCardResultRibbonPublished_' + coProspect.IdProspect)
			
			if ( oBodyProspectCardResultRibbonPublished !== null && typeof oBodyProspectCardResultRibbonPublished == "object" ) oBodyProspectCardResultRibbonPublished.classList.add('d-none');


			let oModalProspectInfo_RibbonPublished = document.getElementById('ModalProspectInfo_RibbonPublished_' + coProspect.IdProspect);
			
			if ( oModalProspectInfo_RibbonPublished !== null && typeof oModalProspectInfo_RibbonPublished == "object" ) oModalProspectInfo_RibbonPublished.classList.add('d-none');

		}

		if (
			coProspect.StatusDetail == 'REPUBLISHED'
		){

			let oBodyProspectCardResultRibbonRepublished = document.getElementById('BodyProspectCardResultRibbonRepublished_' + coProspect.IdProspect)
			
			if ( oBodyProspectCardResultRibbonRepublished !== null && typeof oBodyProspectCardResultRibbonRepublished == "object" ) oBodyProspectCardResultRibbonRepublished.classList.add('d-none');


			let oModalProspectInfo_RibbonRepublished = document.getElementById('ModalProspectInfo_RibbonRepublished_' + coProspect.IdProspect);
			
			if ( oModalProspectInfo_RibbonRepublished !== null && typeof oModalProspectInfo_RibbonRepublished == "object" ) oModalProspectInfo_RibbonRepublished.classList.add('d-none');

		}


		if ( coEleModalProspectInfo_BtnViewMatchingListingMobile !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingMobile == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.remove('d-block');
			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.add('d-none');

		}

		if ( coEleModalProspectInfo_BtnViewMatchingListingDesktop !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingDesktop == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.remove('d-md-block');
			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.add('d-md-none');

		}


		if ( coEleModalProspectInfoDivColEdit !== null && typeof coEleModalProspectInfoDivColEdit == "object" ) coEleModalProspectInfoDivColEdit.classList.remove('d-none');


		if ( coEleModalProspectInfoDivColDelete !== null && typeof coEleModalProspectInfoDivColDelete == "object" ) coEleModalProspectInfoDivColDelete.classList.add('d-none');

				
		if ( coEleModalProspectInfoDivColPublish !== null && typeof coEleModalProspectInfoDivColPublish == "object" ) coEleModalProspectInfoDivColPublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColRepublish !== null && typeof coEleModalProspectInfoDivColRepublish == "object" ) coEleModalProspectInfoDivColRepublish.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColUnpublish !== null && typeof coEleModalProspectInfoDivColUnpublish == "object" ) coEleModalProspectInfoDivColUnpublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColReMatching !== null && typeof coEleModalProspectInfoDivColReMatching == "object" )coEleModalProspectInfoDivColReMatching.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColReactivate !== null && typeof coEleModalProspectInfoDivColReactivate == "object" ) coEleModalProspectInfoDivColReactivate.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColDeactivate !== null && typeof coEleModalProspectInfoDivColDeactivate == "object" ) coEleModalProspectInfoDivColDeactivate.classList.remove('d-none');


		if ( coEleModalProspectInfoDivColMarkUnbooked !== null && typeof coEleModalProspectInfoDivColMarkUnbooked == "object" ) coEleModalProspectInfoDivColMarkUnbooked.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkBooking !== null && typeof coEleModalProspectInfoDivColMarkBooking == "object" )coEleModalProspectInfoDivColMarkBooking.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColMarkPurchased !== null && typeof coEleModalProspectInfoDivColMarkPurchased == "object" ) coEleModalProspectInfoDivColMarkPurchased.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkRented !== null && typeof coEleModalProspectInfoDivColMarkRented == "object" ) coEleModalProspectInfoDivColMarkRented.classList.add('d-none');


		coProspect.coStatusDetail.innerText = 'UNPUBLISHED';
		coProspect.StatusDetail = 	coProspect.coStatusDetail.innerText.trim().toUpperCase();


		let oModalProspectInfo_AgentInfo_ParaPublishDateMobile = document.getElementById('ModalProspectInfo_AgentInfo_ParaPublishDateMobile_' + + coProspect.IdProspect);
		
		if ( oModalProspectInfo_AgentInfo_ParaPublishDateMobile !== null && typeof oModalProspectInfo_AgentInfo_ParaPublishDateMobile == "object" ) oModalProspectInfo_AgentInfo_ParaPublishDateMobile.innerText = "";

		let oModalProspectInfo_AgentInfo_ParaPublishDateDesktop = document.getElementById('ModalProspectInfo_AgentInfo_ParaPublishDateDesktop_' + + coProspect.IdProspect);
		
		if ( oModalProspectInfo_AgentInfo_ParaPublishDateDesktop !== null && typeof oModalProspectInfo_AgentInfo_ParaPublishDateDesktop == "object" ) oModalProspectInfo_AgentInfo_ParaPublishDateDesktop.innerText = "";


		let oBodyProspectCardResultDivRowMatching = document.getElementById('BodyProspectCardResultDivRowMatching_' + coProspect.IdProspect);

		if ( oBodyProspectCardResultDivRowMatching !== null && typeof oBodyProspectCardResultDivRowMatching == "object" )oBodyProspectCardResultDivRowMatching.classList.add('d-none');


		let oBodyProspectCardResultDivRowPublishDate = document.getElementById('BodyProspectCardResultDivRowPublishDate_' + coProspect.IdProspect);
	
		if ( oBodyProspectCardResultDivRowPublishDate !== null && typeof oBodyProspectCardResultDivRowPublishDate == "object" )oBodyProspectCardResultDivRowPublishDate.classList.add('d-none');


		let oModalProspectInfo_DivProspectMatching = document.getElementById('ModalProspectInfo_DivProspectMatching_' + coProspect.IdProspect);
	
		if ( oModalProspectInfo_DivProspectMatching !== null && typeof oModalProspectInfo_DivProspectMatching == "object" )oModalProspectInfo_DivProspectMatching.innerHTML = coHtml_DivProspectMatching_NotPublished;

	
	}
	else {

	}
	
}

async function fProspectReactivate(){

	fIsAlive();
	

	let vUrlProspectReactivate = gHost + "/prospect/reactivate?id=" + coProspect.IdProspect;
//console.log(vUrlProspectReactivate);

	const coResponse = await fetch( vUrlProspectReactivate )

	const coData = await coResponse.json();
//console.log( coData );

	if (
		coData.status = "ok"
	){

		let oBodyProspectCardResultRibbonUnpublishe = document.getElementById('BodyProspectCardResultRibbonUnpublished_' + coProspect.IdProspect);
		
		if ( oBodyProspectCardResultRibbonUnpublishe !== null && typeof oBodyProspectCardResultRibbonUnpublishe == "object" ) oBodyProspectCardResultRibbonUnpublishe.classList.remove('d-none');


		let oModalProspectInfo_RibbonUnpublished = document.getElementById('ModalProspectInfo_RibbonUnpublished_' + coProspect.IdProspect);
		
		if ( oModalProspectInfo_RibbonUnpublished !== null && typeof oModalProspectInfo_RibbonUnpublished == "object" ) oModalProspectInfo_RibbonUnpublished.classList.remove('d-none');


		if (
			coProspect.StatusDetail == 'DEACTIVATED'
		){

			let oBodyProspectCardResultRibbonUnavailable = document.getElementById('BodyProspectCardResultRibbonUnavailable_' + coProspect.IdProspect)
			
			if ( oBodyProspectCardResultRibbonUnavailable !== null && typeof oBodyProspectCardResultRibbonUnavailable == "object" ) oBodyProspectCardResultRibbonUnavailable.classList.add('d-none');


			let oModalProspectInfo_RibbonUnavailable = document.getElementById('ModalProspectInfo_RibbonUnavailable_' + coProspect.IdProspect);
			
			if ( oModalProspectInfo_RibbonUnavailable !== null && typeof oModalProspectInfo_RibbonUnavailable == "object" ) oModalProspectInfo_RibbonUnavailable.classList.add('d-none');

		}


		if ( coEleModalProspectInfo_BtnViewMatchingListingMobile !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingMobile == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.remove('d-block');
			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.add('d-none');

		}

		if ( coEleModalProspectInfo_BtnViewMatchingListingDesktop !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingDesktop == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.remove('d-md-block');
			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.add('d-md-none');

		}


		if ( coEleModalProspectInfoDivColEdit !== null && typeof coEleModalProspectInfoDivColEdit == "object" ) coEleModalProspectInfoDivColEdit.classList.remove('d-none');


		if ( coEleModalProspectInfoDivColDelete !== null && typeof coEleModalProspectInfoDivColDelete == "object" ) coEleModalProspectInfoDivColDelete.classList.add('d-none');

				
		if ( coEleModalProspectInfoDivColPublish !== null && typeof coEleModalProspectInfoDivColPublish == "object" ) coEleModalProspectInfoDivColPublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColRepublish !== null && typeof coEleModalProspectInfoDivColRepublish == "object" ) coEleModalProspectInfoDivColRepublish.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColUnpublish !== null && typeof coEleModalProspectInfoDivColUnpublish == "object" ) coEleModalProspectInfoDivColUnpublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColReMatching !== null && typeof coEleModalProspectInfoDivColReMatching == "object" )coEleModalProspectInfoDivColReMatching.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColReactivate !== null && typeof coEleModalProspectInfoDivColReactivate == "object" ) coEleModalProspectInfoDivColReactivate.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColDeactivate !== null && typeof coEleModalProspectInfoDivColDeactivate == "object" ) coEleModalProspectInfoDivColDeactivate.classList.remove('d-none');


		if ( coEleModalProspectInfoDivColMarkUnbooked !== null && typeof coEleModalProspectInfoDivColMarkUnbooked == "object" ) coEleModalProspectInfoDivColMarkUnbooked.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkBooking !== null && typeof coEleModalProspectInfoDivColMarkBooking == "object" )coEleModalProspectInfoDivColMarkBooking.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColMarkPurchased !== null && typeof coEleModalProspectInfoDivColMarkPurchased == "object" ) coEleModalProspectInfoDivColMarkPurchased.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkRented !== null && typeof coEleModalProspectInfoDivColMarkRented == "object" ) coEleModalProspectInfoDivColMarkRented.classList.add('d-none');


		coProspect.coStatusDetail.innerText = 'REACTIVATED';
		coProspect.StatusDetail = 	coProspect.coStatusDetail.innerText.trim().toUpperCase();


		let oModalProspectInfo_AgentInfo_ParaPublishDateMobile = document.getElementById('ModalProspectInfo_AgentInfo_ParaPublishDateMobile_' + + coProspect.IdProspect);
		
		if ( oModalProspectInfo_AgentInfo_ParaPublishDateMobile !== null && typeof oModalProspectInfo_AgentInfo_ParaPublishDateMobile == "object" ) oModalProspectInfo_AgentInfo_ParaPublishDateMobile.innerText = "";

		let oModalProspectInfo_AgentInfo_ParaPublishDateDesktop = document.getElementById('ModalProspectInfo_AgentInfo_ParaPublishDateDesktop_' + + coProspect.IdProspect);
		
		if ( oModalProspectInfo_AgentInfo_ParaPublishDateDesktop !== null && typeof oModalProspectInfo_AgentInfo_ParaPublishDateDesktop == "object" ) oModalProspectInfo_AgentInfo_ParaPublishDateDesktop.innerText = "";


		let oBodyProspectCardResultDivRowMatching = document.getElementById('BodyProspectCardResultDivRowMatching_' + coProspect.IdProspect);

		if ( oBodyProspectCardResultDivRowMatching !== null && typeof oBodyProspectCardResultDivRowMatching == "object" )oBodyProspectCardResultDivRowMatching.classList.add('d-none');


		let oBodyProspectCardResultDivRowPublishDate = document.getElementById('BodyProspectCardResultDivRowPublishDate_' + coProspect.IdProspect);
	
		if ( oBodyProspectCardResultDivRowPublishDate !== null && typeof oBodyProspectCardResultDivRowPublishDate == "object" )oBodyProspectCardResultDivRowPublishDate.classList.add('d-none');


		let oModalProspectInfo_DivProspectMatching = document.getElementById('ModalProspectInfo_DivProspectMatching_' + coProspect.IdProspect);
	
		if ( oModalProspectInfo_DivProspectMatching !== null && typeof oModalProspectInfo_DivProspectMatching == "object" )oModalProspectInfo_DivProspectMatching.innerHTML = coHtml_DivProspectMatching_NotPublished;

	
	}
	else {

	}
	
}

async function fProspectDeactivate(){

	fIsAlive();
	

	let vUrlProspectDeactivate = gHost + "/prospect/deactivate?id=" + coProspect.IdProspect;
//console.log(vUrlProspectDeactivate);

	const coResponse = await fetch( vUrlProspectDeactivate )

	const coData = await coResponse.json();
//console.log( coData );

	if (
		coData.status = "ok"
	){

		let oBodyProspectCardResultRibbonUnavailable = document.getElementById('BodyProspectCardResultRibbonUnavailable_' + coProspect.IdProspect);
		
		if ( oBodyProspectCardResultRibbonUnavailable !== null && typeof oBodyProspectCardResultRibbonUnavailable == "object" ) oBodyProspectCardResultRibbonUnavailable.classList.remove('d-none');


		let oModalProspectInfo_RibbonUnavailable = document.getElementById('ModalProspectInfo_RibbonUnavailable_' + coProspect.IdProspect);
		
		if ( oModalProspectInfo_RibbonUnavailable !== null && typeof oModalProspectInfo_RibbonUnavailable == "object" ) oModalProspectInfo_RibbonUnavailable.classList.remove('d-none');


		if (
			coProspect.StatusDetail == 'UNPUBLISHED'
		){

			let oBodyProspectCardResultRibbonUnpublished = document.getElementById('BodyProspectCardResultRibbonUnpublished_' + coProspect.IdProspect)
			
			if ( oBodyProspectCardResultRibbonUnpublished !== null && typeof oBodyProspectCardResultRibbonUnpublished == "object" ) oBodyProspectCardResultRibbonUnpublished.classList.add('d-none');


			let oModalProspectInfo_RibbonUnpublished = document.getElementById('ModalProspectInfo_RibbonUnpublished_' + coProspect.IdProspect);
			
			if ( oModalProspectInfo_RibbonUnpublished !== null && typeof oModalProspectInfo_RibbonUnpublished == "object" ) oModalProspectInfo_RibbonUnpublished.classList.add('d-none');

		}


		if ( coEleModalProspectInfo_BtnViewMatchingListingMobile !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingMobile == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.remove('d-block');
			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.add('d-none');

		}

		if ( coEleModalProspectInfo_BtnViewMatchingListingDesktop !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingDesktop == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.remove('d-md-block');
			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.add('d-md-none');

		}


		if ( coEleModalProspectInfoDivColEdit !== null && typeof coEleModalProspectInfoDivColEdit == "object" ) coEleModalProspectInfoDivColEdit.classList.add('d-none');


		if ( coEleModalProspectInfoDivColDelete !== null && typeof coEleModalProspectInfoDivColDelete == "object" ) coEleModalProspectInfoDivColDelete.classList.add('d-none');

				
		if ( coEleModalProspectInfoDivColPublish !== null && typeof coEleModalProspectInfoDivColPublish == "object" ) coEleModalProspectInfoDivColPublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColRepublish !== null && typeof coEleModalProspectInfoDivColRepublish == "object" ) coEleModalProspectInfoDivColRepublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColUnpublish !== null && typeof coEleModalProspectInfoDivColUnpublish == "object" ) coEleModalProspectInfoDivColUnpublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColReMatching !== null && typeof coEleModalProspectInfoDivColReMatching == "object" )coEleModalProspectInfoDivColReMatching.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColReactivate !== null && typeof coEleModalProspectInfoDivColReactivate == "object" ) coEleModalProspectInfoDivColReactivate.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColDeactivate !== null && typeof coEleModalProspectInfoDivColDeactivate == "object" ) coEleModalProspectInfoDivColDeactivate.classList.add('d-none');


		if ( coEleModalProspectInfoDivColMarkUnbooked !== null && typeof coEleModalProspectInfoDivColMarkUnbooked == "object" ) coEleModalProspectInfoDivColMarkUnbooked.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkBooking !== null && typeof coEleModalProspectInfoDivColMarkBooking == "object" )coEleModalProspectInfoDivColMarkBooking.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkPurchased !== null && typeof coEleModalProspectInfoDivColMarkPurchased == "object" ) coEleModalProspectInfoDivColMarkPurchased.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkRented !== null && typeof coEleModalProspectInfoDivColMarkRented == "object" ) coEleModalProspectInfoDivColMarkRented.classList.add('d-none');


		coProspect.coStatusDetail.innerText = 'DEACTIVATED';
		coProspect.StatusDetail = 	coProspect.coStatusDetail.innerText.trim().toUpperCase();


		let oModalProspectInfo_AgentInfo_ParaPublishDateMobile = document.getElementById('ModalProspectInfo_AgentInfo_ParaPublishDateMobile_' + + coProspect.IdProspect);
		
		if ( oModalProspectInfo_AgentInfo_ParaPublishDateMobile !== null && typeof oModalProspectInfo_AgentInfo_ParaPublishDateMobile == "object" ) oModalProspectInfo_AgentInfo_ParaPublishDateMobile.innerText = "";

		let oModalProspectInfo_AgentInfo_ParaPublishDateDesktop = document.getElementById('ModalProspectInfo_AgentInfo_ParaPublishDateDesktop_' + + coProspect.IdProspect);
		
		if ( oModalProspectInfo_AgentInfo_ParaPublishDateDesktop !== null && typeof oModalProspectInfo_AgentInfo_ParaPublishDateDesktop == "object" ) oModalProspectInfo_AgentInfo_ParaPublishDateDesktop.innerText = "";


		let oBodyProspectCardResultDivRowMatching = document.getElementById('BodyProspectCardResultDivRowMatching_' + coProspect.IdProspect);

		if ( oBodyProspectCardResultDivRowMatching !== null && typeof oBodyProspectCardResultDivRowMatching == "object" )oBodyProspectCardResultDivRowMatching.classList.add('d-none');


		let oBodyProspectCardResultDivRowPublishDate = document.getElementById('BodyProspectCardResultDivRowPublishDate_' + coProspect.IdProspect);
	
		if ( oBodyProspectCardResultDivRowPublishDate !== null && typeof oBodyProspectCardResultDivRowPublishDate == "object" )oBodyProspectCardResultDivRowPublishDate.classList.add('d-none');


		let oModalProspectInfo_DivProspectMatching = document.getElementById('ModalProspectInfo_DivProspectMatching_' + coProspect.IdProspect);
	
		if ( oModalProspectInfo_DivProspectMatching !== null && typeof oModalProspectInfo_DivProspectMatching == "object" )oModalProspectInfo_DivProspectMatching.innerHTML = coHtml_DivProspectMatching_NotPublished;

	
	}
	else {

	}
	
}

async function fProspectMarkBooking(){

	fIsAlive();

	let vError = false;

	if (
		coEleFormModalProspectMarkBookingInputAmount.value == ''
	){
		
		coEleFormModalProspectMarkBookingInputAmount.classList.add('form-input-error');

		vError = true;

	}

	if (
		coEleFormModalProspectMarkBookingInputMatchingIdListing.value == ''
	){
		
		coEleFormModalProspectMarkBookingDivDropdownMatchingListing.classList.add('form-input-error');

		vError = true;

	}
	

	if (
		vError == false
	){

		let vUrlProspectMarkBooking = gHost + "/prospect/mark/booking?id=" + coProspect.IdProspect + "&booking_price=" + encodeURIComponent( coEleFormModalProspectMarkBookingInputAmount.value ) + "&matching_id_listing=" + encodeURIComponent( coEleFormModalProspectMarkBookingInputMatchingIdListing.value );
//console.log(vUrlProspectMarkBooking);

		const coResponse = await fetch( vUrlProspectMarkBooking );

		const coData = await coResponse.json();
//console.log( coData );

		if (
			coData.status = "ok"
		){

			let oBodyProspectCardResultRibbonBooking = document.getElementById('BodyProspectCardResultRibbonBooking_' + coProspect.IdProspect);
			
			if ( oBodyProspectCardResultRibbonBooking !== null && typeof oBodyProspectCardResultRibbonBooking == "object" ) oBodyProspectCardResultRibbonBooking.classList.remove('d-none');


			let oModalProspectInfo_RibbonBooking = document.getElementById('ModalProspectInfo_RibbonBooking_' + coProspect.IdProspect);
			
			if ( oModalProspectInfo_RibbonBooking !== null && typeof oModalProspectInfo_RibbonBooking == "object" ) oModalProspectInfo_RibbonBooking.classList.remove('d-none');


			coProspect.coStatusDetail.innerText = 'BOOKING';
			coProspect.StatusDetail = 	coProspect.coStatusDetail.innerText.trim().toUpperCase();
		
		}
		else {

		}


		coModalProspectMarkBooking.hide();

	}
	
}

function fProspectMarkBooking_SelectMatchingListing( pMatchingIdListing ){

	const coEleFormModalProspectMarkBookingDivDropdownMatchingListingAhrefOption = document.getElementById('FormModalProspectMarkBookingDivDropdownMatchingListingAhrefOption_' + pMatchingIdListing);	

	if (
		coEleFormModalProspectMarkBookingDivDropdownMatchingListingAhrefOption !== null && typeof coEleFormModalProspectMarkBookingDivDropdownMatchingListingAhrefOption == "object"
	){

		coEleFormModalProspectMarkBookingInputMatchingIdListing.value = pMatchingIdListing;

		coEleFormModalProspectMarkBookingDivDropdownMatchingListingSpanSelectedDescription.innerHTML = coEleFormModalProspectMarkBookingDivDropdownMatchingListingAhrefOption.innerHTML;

	}

}

async function fProspectMarkUnbooked(){

	fIsAlive();
	

	let vUrlProspectMarkUnbooked = gHost + "/prospect/mark/unbooked?id=" + coProspect.IdProspect;
//console.log(vUrlProspectUnpublish);

	const coResponse = await fetch( vUrlProspectMarkUnbooked )

	const coData = await coResponse.json();
	//const coData = await coResponse.text();
//console.log( coData );

	if (
		coData.status = "ok"
	){

		let oBodyProspectCardResultRibbonCancelBooking = document.getElementById('BodyProspectCardResultRibbonCancelBooking_' + coProspect.IdProspect);
		
		if ( oBodyProspectCardResultRibbonCancelBooking !== null && typeof oBodyProspectCardResultRibbonCancelBooking == "object" ) oBodyProspectCardResultRibbonCancelBooking.classList.remove('d-none');


		let oModalProspectInfo_RibbonCancelBooking = document.getElementById('ModalProspectInfo_RibbonCancelBooking_' + coProspect.IdProspect);
		
		if ( oModalProspectInfo_RibbonCancelBooking !== null && typeof oModalProspectInfo_RibbonCancelBooking == "object" ) oModalProspectInfo_RibbonCancelBooking.classList.remove('d-none');


		if (
			coProspect.StatusDetail == 'BOOKING'
		){

			let oBodyProspectCardResultRibbonBooking = document.getElementById('BodyProspectCardResultRibbonBooking_' + coProspect.IdProspect)
			
			if ( oBodyProspectCardResultRibbonBooking !== null && typeof oBodyProspectCardResultRibbonBooking == "object" ) oBodyProspectCardResultRibbonBooking.classList.add('d-none');


			let oModalProspectInfo_RibbonBooking = document.getElementById('ModalProspectInfo_RibbonBooking_' + coProspect.IdProspect);
			
			if ( oModalProspectInfo_RibbonBooking !== null && typeof oModalProspectInfo_RibbonBooking == "object" ) oModalProspectInfo_RibbonBooking.classList.add('d-none');

		}


		if ( coEleModalProspectInfo_BtnViewMatchingListingMobile !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingMobile == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.add('d-block');
			coEleModalProspectInfo_BtnViewMatchingListingMobile.classList.remove('d-none');

		}

		if ( coEleModalProspectInfo_BtnViewMatchingListingDesktop !== null && typeof coEleModalProspectInfo_BtnViewMatchingListingDesktop == "object" ){

			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.add('d-md-block');
			coEleModalProspectInfo_BtnViewMatchingListingDesktop.classList.remove('d-md-none');

		}


		if ( coEleModalProspectInfoDivColEdit !== null && typeof coEleModalProspectInfoDivColEdit == "object" ) coEleModalProspectInfoDivColEdit.classList.remove('d-none');


		if ( coEleModalProspectInfoDivColDelete !== null && typeof coEleModalProspectInfoDivColDelete == "object" ) coEleModalProspectInfoDivColDelete.classList.add('d-none');

				
		if ( coEleModalProspectInfoDivColPublish !== null && typeof coEleModalProspectInfoDivColPublish == "object" ) coEleModalProspectInfoDivColPublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColRepublish !== null && typeof coEleModalProspectInfoDivColRepublish == "object" ) coEleModalProspectInfoDivColRepublish.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColUnpublish !== null && typeof coEleModalProspectInfoDivColUnpublish == "object" ) coEleModalProspectInfoDivColUnpublish.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColReMatching !== null && typeof coEleModalProspectInfoDivColReMatching == "object" )coEleModalProspectInfoDivColReMatching.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColReactivate !== null && typeof coEleModalProspectInfoDivColReactivate == "object" ) coEleModalProspectInfoDivColReactivate.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColDeactivate !== null && typeof coEleModalProspectInfoDivColDeactivate == "object" ) coEleModalProspectInfoDivColDeactivate.classList.remove('d-none');


		if ( coEleModalProspectInfoDivColMarkUnbooked !== null && typeof coEleModalProspectInfoDivColMarkUnbooked == "object" ) coEleModalProspectInfoDivColMarkUnbooked.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkBooking !== null && typeof coEleModalProspectInfoDivColMarkBooking == "object" )coEleModalProspectInfoDivColMarkBooking.classList.remove('d-none');

		
		if ( coEleModalProspectInfoDivColMarkPurchased !== null && typeof coEleModalProspectInfoDivColMarkPurchased == "object" ) coEleModalProspectInfoDivColMarkPurchased.classList.add('d-none');

		
		if ( coEleModalProspectInfoDivColMarkRented !== null && typeof coEleModalProspectInfoDivColMarkRented == "object" ) coEleModalProspectInfoDivColMarkRented.classList.add('d-none');


		coProspect.coStatusDetail.innerText = 'UNBOOKED';
		coProspect.StatusDetail = 	coProspect.coStatusDetail.innerText.trim().toUpperCase();

	
	}
	else {

	}
	
}

async function fProspectMarkPurchased(){

	fIsAlive();

	let vError = false;

	if (
		coEleFormModalProspectMarkPurchasedInputAmount.value == ''
	){
		
		coEleFormModalProspectMarkPurchasedInputAmount.classList.add('form-input-error');

		vError = true;

	}
	

	if (
		vError == false
	){

		let vUrlProspectMarkPurchased = gHost + "/prospect/mark/purchased?id=" + coProspect.IdProspect + "&purchase_price=" + encodeURIComponent( coEleFormModalProspectMarkPurchasedInputAmount.value );
//console.log(vUrlProspectMarkPurchased);

		const coResponse = await fetch( vUrlProspectMarkPurchased );

		const coData = await coResponse.json();
//console.log( coProspect );
//console.log( coData );

		if (
			coData.status = "ok"
		){

			if (
				coProspect.Modus == 'WTB'
			){

				let oBodyProspectCardResultRibbonPurchased = document.getElementById('BodyProspectCardResultRibbonPurchased_' + coProspect.IdProspect);
				
				if ( oBodyProspectCardResultRibbonPurchased !== null && typeof oBodyProspectCardResultRibbonPurchased == "object" ) oBodyProspectCardResultRibbonPurchased.classList.remove('d-none');


				let oModalProspectInfo_RibbonPurchased = document.getElementById('ModalProspectInfo_RibbonPurchased_' + coProspect.IdProspect);
				
				if ( oModalProspectInfo_RibbonPurchased !== null && typeof oModalProspectInfo_RibbonPurchased == "object" ) oModalProspectInfo_RibbonPurchased.classList.remove('d-none');

			}
			else if (
				coProspect.Modus == 'WTR'
			){

				let oBodyProspectCardResultRibbonRented = document.getElementById('BodyProspectCardResultRibbonRented_' + coProspect.IdProspect);
				
				if ( oBodyProspectCardResultRibbonRented !== null && typeof oBodyProspectCardResultRibbonRented == "object" ) oBodyProspectCardResultRibbonRented.classList.remove('d-none');


				let oModalProspectInfo_RibbonRented = document.getElementById('ModalProspectInfo_RibbonRented_' + coProspect.IdProspect);
				
				if ( oModalProspectInfo_RibbonRented !== null && typeof oModalProspectInfo_RibbonRented == "object" ) oModalProspectInfo_RibbonRented.classList.remove('d-none');

			}


			let oBodyProspectCardResultRibbonBooking = document.getElementById('BodyProspectCardResultRibbonBooking_' + coProspect.IdProspect);
			
			if ( oBodyProspectCardResultRibbonBooking !== null && typeof oBodyProspectCardResultRibbonBooking == "object" ) oBodyProspectCardResultRibbonBooking.classList.add('d-none');


			let oModalProspectInfo_RibbonBooking = document.getElementById('ModalProspectInfo_RibbonBooking_' + coProspect.IdProspect);
			
			if ( oModalProspectInfo_RibbonBooking !== null && typeof oModalProspectInfo_RibbonBooking == "object" ) oModalProspectInfo_RibbonBooking.classList.add('d-none');


			if (
				coProspect.Modus == 'WTB'
			){

				coProspect.coStatusDetail.innerText = 'PURCHASED';

			}
			else if (
				coProspect.Modus == 'WTR'
			){

				coProspect.coStatusDetail.innerText = 'RENTED';
			
			}

			coProspect.StatusDetail = 	coProspect.coStatusDetail.innerText.trim().toUpperCase();
		
		}
		else {

		}


		coModalProspectMarkPurchased.hide();

	}
	
}



/*****************************************************************/


const coInputCode = document.getElementById('code');

if ( coInputCode !== null && typeof coInputCode == "object" ){

	coInputCode.addEventListener( 'keydown', function ( oEvent ) {

		this.classList.remove('form-input-error');

	});

}

function fVerifyAuthorizationCode(){
	let oInputCode = document.getElementById('code');
	
	if (oInputCode.value == '') {
		oInputCode.classList.add('form-input-error');
		return false;
	}

	let str = oInputCode.form.elements.namedItem('di').value;let arr = str.split("-");let hex = "";for (let i=0; i<arr.length; i++){ hex = hex + arr[i]; }; let bit = [];for(var i=0; i< hex.length-1; i+=2) bit.push(parseInt(hex.substr(i, 2), 16));str = String.fromCharCode.apply(String, bit);str = str.split("").reverse().join("");
	if ( str == oInputCode.value){
		oInputCode.form.submit();
	}
	else {
		oInputCode.value = '';
		alert('Authorization code does not match. Please re-enter the Authorization Code.');
	}
}


/*****************************************************************/


let vListingPage = 1;

let vBodyListingLoadData = true;
let vBodyListingResultEnd = false;

let htmlBodyListingResultNotFound = '<div id="BodyListingResultNotFound" class="text-center mt-5"><h5 class="fw-bold">No result found.</h5><p>Please modify your search.</p><br><br>&nbsp;</div>';

let htmlBodyListingResultLoading = '<div id="BodyListingResultLoading" class="text-center mt-5"><h5 class="fw-bold">Loading listing....</h5><br><br><br>&nbsp;</div>';

let htmlBodyListingResultEnd = '<div id="BodyListingResultEnd" class="text-center mt-5"><h5 class="fw-bold">End of listing :)</h5><br><br><br>&nbsp;</div>';

const coEleBodyListingColumn2SearchResult = document.getElementById('BodyListingColumn2SearchResult');

if ( coEleBodyListingColumn2SearchResult !== null && typeof coEleBodyListingColumn2SearchResult == "object" ){
/*
	document.addEventListener('DOMContentLoaded', function(){
		
//console.log( 'DOMContentLoaded' );

		vBodyListingLoadData = false;

		fListingSearch();

	});
*/
	/*
	document.addEventListener( 'unload', function () {

		if ( vListingPage > 1 ){

			document.scrollTop = 0;

		}

	});
	*/

	window.addEventListener('scroll', function() {

//console.log( 'scroll' );

		let oPosition = coEleBodyListingColumn2SearchResult.getBoundingClientRect();
		
		if( vBodyListingLoadData && ( oPosition.bottom - window.innerHeight ) <= 1000 ) {
			
//console.log("vBodyListingLoadData : " + vBodyListingLoadData)
//console.log("oPosition.bottom : " + oPosition.bottom)
//console.log("window.innerHeight : " + window.innerHeight)
//console.log("oPosition.bottom - window.innerHeight : " + ( oPosition.bottom - window.innerHeight) )

			vBodyListingLoadData = false;
//console.log('Load Data');
			fListingSearch();

			//setTimeout( () => { oBodyListingResultNotFound.remove(); oBodyListingResultLoading.remove(); }, 3000);
		}
		else {
//console.log('scrolling');
		}

	});


}

async function fListingSearch(){

	fIsAlive();
	

	//alert(gHost);
	//coEleBodyListingColumn2SearchResult.innerHTML += htmlBodyListingResultLoading;

//console.log("vListingPage : " + vListingPage);

	let vQueryString = (new URLSearchParams(window.location.search)).toString();
//console.log(vQueryString);

	let vUrlListingSearch = gHost + "/listing/search?p=" + vListingPage + (vQueryString ? "&" + vQueryString : "");
//console.log(vUrlListingSearch);

	const coResponse = await fetch( vUrlListingSearch );
	//const coData = await coResponse.json();
	const coData = await coResponse.text();
//console.log(coData);

//console.log ( "vListingPage = " + vListingPage );

	if ( coData.toString().trim() == "0" && vListingPage == 1 ){

		coEleBodyListingColumn2SearchResult.innerHTML = htmlBodyListingResultNotFound;

		vBodyListingLoadData = false;

	}
	else if ( coData.toString().trim() == "0" && vListingPage > 1 ){
		
		vBodyListingLoadData = false;

	}
	else {
//console.log("vListingPage : " + vListingPage);
//console.log(coData);
		coEleBodyListingColumn2SearchResult.innerHTML += coData;

		//let oBodyListingResultLoading = document.getElementById('BodyListingResultLoading');
		//oBodyListingResultLoading.remove();

		vListingPage += 1;
		vBodyListingLoadData = true;

	}


//console.log ( "vListingPage = " + vListingPage );
//console.log ( "===========");
}


const coFormListingSearchDesktopSelectState = document.getElementById('FormListingSearchDesktopSelectState');

const coFormListingSearchMobileSelectState = document.getElementById('FormListingSearchMobileSelectState');


if ( coFormListingSearchDesktopSelectState !== null && typeof coFormListingSearchDesktopSelectState == "object" ){

	coFormListingSearchDesktopSelectState.addEventListener( 'change', function ( oEvent ) {
return false;		
		fListingSearchSelectStateChange( this );

	} );

}

if ( coFormListingSearchMobileSelectState !== null && typeof coFormListingSearchMobileSelectState == "object" ){

	coFormListingSearchMobileSelectState.addEventListener( 'change', function ( oEvent ) {
		
		fListingSearchSelectStateChange( this );

	} );

}

async function fListingSearchSelectStateChange( oEleSearchState ){

	fIsAlive();

//console.log( oEleSearchState );
//console.log( oEleSearchState.id );
//console.log( '=' + oEleSearchState.value + '=' );
	
	let oEleSearchArea = (
			oEleSearchState.id == 'FormListingSearchDesktopSelectState'
			?
			document.getElementById('FormListingSearchDesktopSelectArea')
			:
			(
				oEleSearchState.id == 'FormListingSearchMobileSelectState'
				?
				document.getElementById('FormListingSearchMobileSelectArea')
				:
				null
			)
		);

	if ( 
		oEleSearchArea !== null && typeof oEleSearchArea == 'object'
	){

		oEleSearchArea.options.length = 0;

		oEleSearchArea.options.add( new Option( "[ All Areas ]", "" ) );

	
		if ( oEleSearchState.value != '' ) {

			let vUrlLocationArea = gHost + "/listing/get/area?id=" + oEleSearchState.value;
//console.log(vUrl);

			const oResponse = await fetch( vUrlLocationArea )
			//const oData = await oResponse.json();
			const oData = await oResponse.text();
//console.log(oData);

			const oArAddrIdArea = JSON.parse( oData );
//console.log( oArAddrIdArea );

			for ( const oAddrIdArea of oArAddrIdArea ){
				
				oEleSearchArea.options.add( 
					new Option( 
						oAddrIdArea.desc,
						oAddrIdArea.id,
						)
					);
				
			}

		}

	}

};


const coFormListingSearchDesktopSelectPropertyCategory = document.getElementById('FormListingSearchDesktopSelectPropertyCategory');

const coFormListingSearchMobileSelectPropertyCategory = document.getElementById('FormListingSearchMobileSelectPropertyCategory');


if ( coFormListingSearchDesktopSelectPropertyCategory !== null && typeof coFormListingSearchDesktopSelectPropertyCategory == "object" ){

	coFormListingSearchDesktopSelectPropertyCategory.addEventListener( 'change', function ( oEvent ) {
		
		fListingSearchSelectCategoryChange( this );

	} );

}

if ( coFormListingSearchMobileSelectPropertyCategory !== null && typeof coFormListingSearchMobileSelectState == "object" ){

	coFormListingSearchMobileSelectPropertyCategory.addEventListener( 'change', function ( oEvent ) {
		
		fListingSearchSelectCategoryChange( this );

	} );

}

async function fListingSearchSelectCategoryChange( oEleSearchCategory ){

	fIsAlive();

//console.log( oEleSearchCategory );
//console.log( oEleSearchCategory.id );
//console.log( '=' + oEleSearchCategory.value + '=' );
	
	let oEleSearchType = (
			oEleSearchCategory.id == 'FormListingSearchDesktopSelectPropertyCategory'
			?
			document.getElementById('FormListingSearchDesktopSelectPropertyType')
			:
			(
				oEleSearchCategory.id == 'FormListingSearchMobileSelectPropertyCategory'
				?
				document.getElementById('FormListingSearchMobileSelectPropertyType')
				:
				null
			)
		);

	if ( 
		oEleSearchType !== null && typeof oEleSearchType == 'object'
	){

		oEleSearchType.options.length = 0;

		oEleSearchType.options.add( new Option( "[ All Types ]", "" ) );

	
		if ( oEleSearchCategory.value != '' ) {

			let vUrlPropertyType = gHost + "/listing/get/type?id=" + oEleSearchCategory.value;
//console.log(vUrl);

			const oResponse = await fetch( vUrlPropertyType )
			//const oData = await oResponse.json();
			const oData = await oResponse.text();
//console.log(oData);

			const oArIdType = JSON.parse( oData );
//console.log( oArIdType );

			for ( const oIdType of oArIdType ){
				
				oEleSearchType.options.add( 
					new Option( 
						oIdType.desc,
						oIdType.id,
						)
					);
				
			}

		}

	}

};


/*****************************************************************/

function fIsValidGoogleMapsLink( pUrl ) {

	if (typeof pUrl !== 'string' || !pUrl) {
		return false;
	}

	try {
		
		const coParsedUrl = new URL( pUrl );

		// 1. Enforce HTTPS for secure links.
		if (
			coParsedUrl.protocol !== 'https:'
		){
			
			return false;
		
		}

		// Case 1: Check for the mobile app sharing domain
		if (
			coParsedUrl.hostname === 'maps.app.goo.gl'
		){
			
			return true;

		}

		// Case 2: Check for the standard Google Maps domain
		if (
			coParsedUrl.hostname === 'www.google.com'
			&&
			coParsedUrl.pathname.startsWith('/maps')
		){
		
			const coSearchParams = coParsedUrl.searchParams;

			// Prioritize place ID as the most specific identifier.
			if (
				coSearchParams.has('query_place_id')
				&&
				coSearchParams.get('api') === '1'
			){
			
				return true;

			}

			// Check for a specific coordinate query.
			const coQuery = coSearchParams.get('query');

			if (
				coQuery
				&&
				coSearchParams.get('api') === '1'
			){
				
				// Regex to check for a coordinate pair (e.g., "40.712776,-74.005974").
				const coCoordinateRegex = /^-?\d+\.\d+,-?\d+\.\d+$/;

				return coCoordinateRegex.test( coQuery );
			}
		}

		return false;

	}
	catch (
		error
	){
		
		return false;

	}
	
}

/*****************************************************************/


function GetYoutubeID( url ) {
	// If it's the mobile link
	if (url.includes('youtu.be/')) {
		const parts = url.split('youtu.be/')[1];
		// Chop off the ?si= tracking stuff at the question mark
		return parts.split('?')[0].substring(0, 11);
	}
	
	// If it's the embed link
	if (url.includes('embed/')) {
		const index = url.indexOf('embed/') + 6;
		return url.substring(index, index + 11);
	}
	
	// If it's a standard link
	if (url.includes('v=')) {
		return url.split('v=')[1].split('&')[0].substring(0, 11);
	}
	
	return null;
}


/*****************************************************************/

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


/*****************************************************************/

function fSwitchCountry(
	pIdCountry,
	pQueryString
){

	const cUrlCurrent = window.location.href;
	const cUrlPathName = window.location.pathname;
	const cUrlQueryString = window.location.search;
//console.log( cUrlCurrent );
//console.log( cUrlPathName );
//console.log( cUrlQueryString );

	if (
		pQueryString === undefined || pQueryString === null || pQueryString === ''
	){

		pQueryString = cUrlQueryString;

	}
	else {
		
		if (
			cUrlQueryString != ''
		){

			pQueryString = cUrlQueryString + '&' + pQueryString;

		}
		else {

			pQueryString = '?' + pQueryString;

		}

	}
console.log( pQueryString );
	
	//window.location.href = gHost + '/switch/country?id_country=' + pIdCountry;
	let vUrlSwitch = gHost + '/switch/country?id_country=' + pIdCountry + '&upn=' + encodeURIComponent( cUrlPathName ) + '&uqs=' + encodeURIComponent( pQueryString );
console.log( vUrlSwitch );

	window.location.href = vUrlSwitch;

}

/*****************************************************************/

async function fChainFormSelectGetDownlinkParameterItem(
	pEleOrigin
){
//console.log( pEleOrigin );

	fIsAlive();

	const cRefID = pEleOrigin.value;

	const cDownlinkID = pEleOrigin.getAttribute('chain-select-downlink-id');
	const cDownlinkLabelDefault = pEleOrigin.getAttribute('chain-select-downlink-label-default');
	const cDownlinkLabelEmpty = pEleOrigin.getAttribute('chain-select-downlink-label-empty');
//console.log( cDownlinkID );
//console.log( cDownlinkLabel );


	if (
		cDownlinkID !== null 
		&& 
		cDownlinkID != ''
	){

		const coEleDownlink = document.getElementById( cDownlinkID );
		
		if ( 
			coEleDownlink !== null 
			&& 
			typeof coEleDownlink == 'object'
		){

			coEleDownlink.options.length = 0;

			if (
				cRefID !== null
				&&
				cRefID != ''
			){

				//let vUrlParamGetItem = gHost + "/param/get-item?refid=" + cRefID;
				let vUrlParamGetItem = "/param/get-item?refid=" + cRefID;
	//console.log(vUrlParamGetItem);

				const oResponse = await fetch( vUrlParamGetItem );
	//const oData = await oResponse.json();
				const oData = await oResponse.text();
	//console.log(oData);

				const oArParam = JSON.parse( oData );
	//console.log( oArParam );

				if (
					oArParam.status == 'ok'
				){
					
					coEleDownlink.options.add( new Option( "[ " + cDownlinkLabelDefault + " ]", "" ) );

					for ( const oParameter of oArParam.parameter ){
						
						coEleDownlink.options.add( 
							new Option( 
								oParameter.desc,
								oParameter.id,
							)
						);
						
					}

				}
				else {

					coEleDownlink.options.add( new Option( "[ " + cDownlinkLabelEmpty + " ]", "" ) );
					
				}

			}
			else {

				coEleDownlink.options.add( new Option( "[ " + cDownlinkLabelEmpty + " ]", "" ) );

			}

			
			fChainFormSelectGetDownlinkParameterItem( coEleDownlink );

		}

	}

};

/*****************************************************************/

/*****************************************************************/
