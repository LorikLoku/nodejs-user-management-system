//add user request - shfaq allertin nese shtypet butoni i formes (views/include/_form.ejs)
$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

//update user request - menaxhon formen e /views/update_user.ejs
$("#update_user").submit(function(event){
    event.preventDefault();                         //se le mu bo reload browserin kur tklikohet submit butoni
 
    var unindexed_array = $(this).serializeArray(); //marrim te gjitha te dhenat nga forma e bere submit
    var data = {}

    $.map(unindexed_array, function(n, i){          //n - rikthen kejt datat e unindexed_array
        data[n['name']] = n['value']                //i - rikthen id e unindexed_array
    })                                              //data[n['name']] = n['value'] lidh name-in perkates me vleren e tij psh id = asd21asd3225
                                                    //data[n['name']] = n['value'] na ndihmon mi bo gati te dhenat per post request

    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,  //fillimisht specifikohet api pathi se ku kan me shku te dhenat
        "method" : "PUT",                                      //metoda put pasi qe kemi dergim te te dhenave
        "data" : data                                          //te dhenat qe duhet te dergohen
    }

    $.ajax(request).done(function(response){                    //shfaq allertin "Te dhenat u pdateuan" permes ajax
        alert("Data Updated Successfully!");
    })

})

//delete user request
if(window.location.pathname == "/"){                                //nese jemi ne home root
    $ondelete = $(".table tbody td a.delete");                      //shkon e selekton tagun a me klase delete ne views/include/_show.ejs dmth iksin afer pencil 
    $ondelete.click(function(){ 
        var id = $(this).attr("data-id")                            //marrim id e userit, iksi i te cilit eshte shtype

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,        //specifikohet api pathi se prej ku kan me u fshi te dhenat
            "method" : "DELETE"                                     //metoda delete pasi qe kemi fshirje te te dhenave
        }

        if(confirm("Do you really want to delete this record?")){   //shfaq allertin per te konfirmuar fshirjen e te dhenave permes ajax
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();                                  //pas fshirjes reloadohet browseri
            })
        }

    })
}