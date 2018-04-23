
$(document).ready(function() {

    var name = $("#name");
    console.log(name);

    $("#button2").on('click', function () {

        $.ajax({

            url: "https://www.wikidata.org/w/api.php?action=query&list=search&srsearch=" + name.val() + "&format=json&origin=*",

            success: function (result) {
                //console.log(result);
                var Q_ID = result.query.search[0]["title"];
                console.log(Q_ID);


                $("#button").on('click', function () {

                    $.ajax({

                        url: "https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json&entity=" + Q_ID + "&origin=*",


                        success: function (result) {
                            var item = result.claims.P18[0].mainsnak.datavalue.value;
                            var new_item = item.split(' ').join('_');
                            var test = (MD5(new_item));
                            var number_1 = test[0];
                            var number_2 = test[0] + test[1];
                            $("#results").empty();


                            //doesn't work all the time, probably an encoding problem e.g. Q457 = île-de-blabla, doesn't work!

                            var output = "<img id='img' src='https://upload.wikimedia.org/wikipedia/commons/" + number_1 + "/" + number_2 + "/" + new_item + "'>"
                            $("#results").append(output);

                        },
                        error: function (result) {
                            console.log("Error: ", result)
                        }

                    })

                })


                $("#button3").on('click', function () {

                    $.ajax({

                        url: "https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json&entity=" + Q_ID + "&property=P27&origin=*",


                        success: function (result) {
                            //console.log(result)
                            var country_ID = result.claims.P27[0].mainsnak.datavalue.value.id;

                            show_country(country_ID)


                            $("#info_books").empty();
                            $("#info_books").append("Notable books")


                            get_book_id(Q_ID, 0, "book_1")
                            get_book_id(Q_ID, 1, "book_2")
                            get_book_id(Q_ID, 2, "book_3")
                            get_book_id(Q_ID, 3, "book_4")
                            get_book_id(Q_ID, 4, "book_5")



                        }

                    })

                })



            }

        })


    })


})



function show_country(country_ID) {

    $.ajax({

        url: "https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json&entity=" + country_ID + "&property=P935&origin=*",


        success: function (result) {
            //console.log(result)
            var country_name = result.claims.P935[0].mainsnak.datavalue.value;
            //console.log(country_name)
            $("#country").empty();
            $("#country").append("Country of origin:" + country_name);


        },
        error: function (result) {
            console.log("Error: ", result)
        }

    })

}










function get_book_id(Q_ID, x, list_tag) {

    $.ajax({

        url: "https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json&entity=" + Q_ID + "&property=P800&origin=*",


        success: function (result) {
            //console.log(result)
            var book_id_1  = result.claims;
            book_id_1 = book_id_1["P800"][x]["mainsnak"]["datavalue"]["value"]["id"]

            get_book(book_id_1, list_tag)

        },
        error: function (result) {
            console.log("Error: ", result)
        }



    })

}


function get_book(book_id, list_tag) {


    $.ajax({

        url: "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=" + book_id + "&props=labels&languages=en&format=json&origin=*",

        success: function (result) {
            var book_1 = result.entities;
            var book = book_1[book_id]["labels"]["en"]["value"];
            //console.log(book);

            add_to_list(book, list_tag)

        }

    })


}


function add_to_list(book, list_tag) {

    $("#" + list_tag).empty();
    $("#" + list_tag).append(book)


}

