
$(document).ready(function() {

var name = $("#name");
console.log(name);

    $("#button2").on('click', function () {

        $.ajax({

            url: "https://www.wikidata.org/w/api.php?action=query&list=search&srsearch=" + name.val() + "&format=json&origin=*",

            success: function (result) {
                console.log(result);
                var Q_ID = result.query.search[0]["title"];
                console.log(Q_ID);

                //return Q_ID;



                $("#button").on('click',function() {

                    $.ajax({

                        url : "https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json&entity=" + Q_ID + "&origin=*",


                        success: function(result) {
                            var item = result.claims.P18[0].mainsnak.datavalue.value;
                            var new_item = item.split(' ').join('_');
                            var test = (MD5(new_item));
                            var number_1 = test[0];
                            var number_2 = test[0] + test[1];
                            $( "#results" ).empty();


                            //doesn't work all the time, probably an encoding problem e.g. Q457 = île-de-blabla, doesn't work!

                            var output =  "<img id='img' src='https://upload.wikimedia.org/wikipedia/commons/" + number_1 + "/" + number_2 + "/" + new_item + "'>"
                            $("#results").append(output);

                        },
                        error: function(result) {
                            console.log("Error: ", result)
                        }

                    })

                })

            }

        })

    })



});
