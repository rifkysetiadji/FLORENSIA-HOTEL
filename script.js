var nama = document.getElementById('name')
var lama = document.getElementById('lama')
var kode_booking = document.getElementById('kode_booking')
var jumlah = document.getElementById('jumlah')
var payment = document.getElementById('payment')
var btn_process = document.getElementById('process')
var btn_hapus = document.getElementById('hapus')

var result_name =document.getElementById('result_name')
var result_room_name =document.getElementById('result_room_name')
var result_room_number =document.getElementById('result_room_number')
var result_lama =document.getElementById('result_lama')
var result_potongan_tambahan =document.getElementById('result_potongan_tambahan')
var result_total =document.getElementById('result_total')
var result_kode_booking =document.getElementById('result_kode_booking')
var result_lantai =document.getElementById('result_lantai')
var result_jumlah =document.getElementById('result_jumlah')
var result_payment =document.getElementById('result_payment')
var result_springbed =document.getElementById('result_springbed')
var room_list=[
    {
        code:'AL',
        name: 'Alamanda',
        price:450000
    },
    {
        code:'BG',
        name: 'Bougenvile',
        price:350000
    },
    {
        code:'CR',
        name: 'Crysan',
        price:375000
    },
    {
        code:'KM',
        name: 'Kemuning',
        price:425000
    },
]
function findRoomName(){
    var code =kode_booking.value.slice(0,2)
    return room_list.filter((d)=>{
        return d.code===code
    })[0]
}
function findTotalAndPotonganTambahan(){
    var total_temporary
    var percent
    var total_result
    var status=""
    if(payment.value==="Kartu kredit"){
        total_temporary=findRoomName().price*lama.value+biayaSpringBed()
        percent=(2/100)* total_temporary
        total_result= total_temporary+percent
        status="tambahan"
    }else if(payment.value === "Debit"){
        total_temporary=findRoomName().price*lama.value+biayaSpringBed()
        percent=(1.5/100)* total_temporary
        total_result= total_temporary-percent
        status="potongan"

    }else if(payment.value === "Cash"){
        total_temporary=findRoomName().price*lama.value+biayaSpringBed()
        total_result= total_temporary
        status="Tidak Ada"
    }
    return{
        total_result:total_result,
        percent:percent,
        status:status

    }
   
}
function biayaSpringBed(){
    if(jumlah.value>2){
        return 75000*(jumlah.value-2)
    }else{
        return 0
    }
}
btn_process.addEventListener("click",()=>{
    result_name.innerText=nama.value;
    result_room_name.innerText =findRoomName().name 
    result_room_number.innerText = kode_booking.value.slice(4,7)
    result_lama.innerText = lama.value;
    result_kode_booking.innerText = kode_booking.value;
    result_lantai.innerText = kode_booking.value.slice(2,4)
    result_jumlah.innerText = jumlah.value;
    result_payment.innerText = payment.value;
    result_springbed.innerText = biayaSpringBed()
    if(findTotalAndPotonganTambahan().status!=="Tidak Ada"){
        result_potongan_tambahan.innerText = findTotalAndPotonganTambahan().percent
        result_potongan_tambahan.setAttribute("class",findTotalAndPotonganTambahan().status==="potongan"?'green-text':'red-text')

    }else{
        result_potongan_tambahan.innerText = findTotalAndPotonganTambahan().status
    }
    result_total.innerText = findTotalAndPotonganTambahan().total_result
    document.getElementById('output').setAttribute('class','show-component')
})

btn_hapus.addEventListener("click",()=>{
    window.location.reload()
})
