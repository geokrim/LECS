function userToTable() {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/user/all",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        //!!!--Here is the main catch------>fnAddData
        var isActiveCell = "";
        if (data.isActive == 1) {
          isActiveCell = '<i class="fa fa-check" aria-hidden="true"></i>';
        } else {
          isActiveCell = '<i class="fa fa-minus" aria-hidden="true"></i>';
        }
        var isAdminCell = "";
        if (data.isAdmin == 1) {
          isAdminCell = '<i class="fa fa-check" aria-hidden="true"></i>';
        } else {
          isAdminCell = '<i class="fa fa-minus" aria-hidden="true"></i>';
        }
        var isCollaboratorCell = "";
        if (data.isCollaborator == 1) {
          isCollaboratorCell = '<i class="fa fa-check" aria-hidden="true"></i>';
        } else {
          isCollaboratorCell = '<i class="fa fa-minus" aria-hidden="true"></i>';
        }

        $("#usertable")
          .dataTable()
          .fnAddData(
            [
              data.id,
              '<a href="people_main.html?id=' +
                data.id +
                '">' +
                data.name +
                "</a>",
              '<a href="people_main.html?id=' +
                data.id +
                '">' +
                data.surname +
                "</a>",
              '<a href="people_main.html?id=' +
                data.id +
                '">' +
                data.username +
                "</a>",
              isActiveCell,
              isAdminCell,
              isCollaboratorCell,
              '<a href="" data-toggle="modal" data-target="#people_delete_modal" onclick="people_check_before_delete(' +
                "'" +
                data.id +
                "' ," +
                "'" +
                data.surname +
                " " +
                data.name +
                "'" +
                ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>',
              // '<span onclick="user_delete(' + data.id +  ', \'' + data.surname + '\')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>'
            ],
            false
          );
      });
      // When second attribut of fnAddData == false, you need to fnDraw
      $("#usertable").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error people: userToTable" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure people: userToTable" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function userGetId() {
  let searchParams = new URLSearchParams(window.location.search);
  let paramId = searchParams.get("id");
  return paramId;
}

function showUserById(curr_user_id) {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/user/" + curr_user_id,
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT
      document.getElementById("user_id").value = data.id;
      document.getElementById("user_username").value = data.username;
      document.getElementById("user_password").value = data.pass;
      document.getElementById("user_name").value = data.name;
      document.getElementById("user_surname").value = data.surname;

      document.getElementById("user_active").checked = false;
      if (data.isActive == 1) {
        document.getElementById("user_active").checked = true;
      }
      document.getElementById("user_admin").checked = false;
      if (data.isAdmin == 1) {
        document.getElementById("user_admin").checked = true;
      }
      document.getElementById("user_collaborator").checked = false;
      if (data.isCollaborator == 1) {
        document.getElementById("user_collaborator").checked = true;
      }

      if (data.ip == 1) {
        document.getElementById("user_ip").checked = true;
      }
      if (data.seeUser == 1) {
        document.getElementById("user_see_user").checked = true;
      }
      if (data.seeStats == 1) {
        document.getElementById("user_see_stats").checked = true;
      }
      if (data.seeExport == 1) {
        document.getElementById("user_see_export").checked = true;
      }
      if (data.seeCusVafi == 1) {
        document.getElementById("user_see_cus_vafi").checked = true;
      }

      if (data.seeCusHistory == 1) {
        document.getElementById("user_see_cus_history").checked = true;
      }
      if (data.seeCusDetails == 1) {
        document.getElementById("user_see_cus_details").checked = true;
      }
      if (data.seeCash == 1) {
        document.getElementById("user_see_cash").checked = true;
      }
      if (data.seeSms == 1) {
        document.getElementById("user_see_sms").checked = true;
      }
      if (data.seeSettings == 1) {
        document.getElementById("user_see_settings").checked = true;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error people: userGetId" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure people: userGetId" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function updateUserById() {
  var urlRaw = serverURL + "/user/updateUser/" + curr_user_id;
  var isActive = 0;
  if (document.getElementById("user_active").checked == true) {
    isActive = 1;
  }
  var isAdmin = 0;
  if (document.getElementById("user_admin").checked == true) {
    isAdmin = 1;
  }
  var isCollaborator = 0;
  if (document.getElementById("user_collaborator").checked == true) {
    isCollaborator = 1;
  }

  var isIpOnly = 0;
  if (document.getElementById("user_ip").checked == true) {
    isIpOnly = 1;
  }
  var canSeeUser = 0;
  if (document.getElementById("user_see_user").checked == true) {
    canSeeUser = 1;
  }
  var canSeeStats = 0;
  if (document.getElementById("user_see_stats").checked == true) {
    canSeeStats = 1;
  }
  var canSeeExport = 0;
  if (document.getElementById("user_see_export").checked == true) {
    canSeeExport = 1;
  }
  var canSeeCusVafi = 0;
  if (document.getElementById("user_see_cus_vafi").checked == true) {
    canSeeCusVafi = 1;
  }
  var canSeeCusHistory = 0;
  if (document.getElementById("user_see_cus_history").checked == true) {
    canSeeCusHistory = 1;
  }

  var canSeeCusDetails = 0;
  if (document.getElementById("user_see_cus_details").checked == true) {
    canSeeCusDetails = 1;
  }
  var canSeeCash = 0;
  if (document.getElementById("user_see_cash").checked == true) {
    canSeeCash = 1;
  }
  var canSeeSms = 0;
  if (document.getElementById("user_see_sms").checked == true) {
    canSeeSms = 1;
  }
  var canSeeSettings = 0;
  if (document.getElementById("user_see_settings").checked == true) {
    canSeeSettings = 1;
  }

  // PREPARE JSON OBJECT
  var upd_User = {
    id: curr_user_id,
    username: $("#user_username").val(),
    pass: $("#user_password").val(),
    name: $("#user_name").val(),
    surname: $("#user_surname").val(),
    isActive: isActive,
    isAdmin: isAdmin,
    isCollaborator: isCollaborator,
    ip: isIpOnly,
    seeUser: canSeeUser,
    seeStats: canSeeStats,
    seeExport: canSeeExport,
    seeCusVafi: canSeeCusVafi,
    seeCusHistory: canSeeCusHistory,
    seeCusDetails: canSeeCusDetails,
    seeCash: canSeeCash,
    seeSms: canSeeSms,
    seeSettings: canSeeSettings,
  };
  // console.log('upd_User: ' + JSON.stringify(upd_User));

  // AJAX MAGIC
  $.ajax({
    url: urlRaw,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_User),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // DO NOTHING
    },
    complete: function (data) {
      window.location.replace("people.html" + "?pid=" + generateRandomToken());
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error people: updateUserById" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure people: updateUserById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function userNewInitialize() {
  document.getElementById("user_id").value = "";
  document.getElementById("user_username").value = "";
  document.getElementById("user_password").value = "";
  document.getElementById("user_name").value = "";
  document.getElementById("user_surname").value = "";
  document.getElementById("user_active").checked = true;
  document.getElementById("user_admin").checked = false;
  document.getElementById("user_collaborator").checked = true;
}

function check_if_username_exists_before_insert_new() {
  // AJAX MAGIC
  var user_username = document.getElementById("user_username").value;
  // console.log('user_username: ' + user_username);
  var boolPermit = 0;
  $.ajax({
    url: serverURL + "/user/findByUsername/" + user_username,
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        if (data.username == user_username) {
          boolPermit = 1;
          // console.log('Username found in DB');
          document.getElementById("warning_message").innerHTML =
            'Το πεδίο "Username" χρησιμοποιείται, παρακαλώ επιλέξτε κάτι διαφορετικό.';
          document.getElementById("user_new").style.visibility = "hidden";
        } else {
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error people: check_if_username_exists_before_insert_new" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure people: check_if_username_exists_before_insert_new" +
          " " +
          errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  if (boolPermit == 1) {
    // console.log('Username found in DB');
    document.getElementById("warning_message").innerHTML =
      'Το πεδίο "Username" χρησιμοποιείται, παρακαλώ επιλέξτε κάτι διαφορετικό.';
    document.getElementById("user_new").style.visibility = "hidden";
  } else {
    // console.log('Username NOT found in DB');
    document.getElementById("warning_message").innerHTML = "";
    document.getElementById("user_new").style.visibility = "visible";
  }
}

function userInsertNew() {
  // console.log('userInsertNew()');
  var urlInsertRaw = serverURL + "/user/add/";
  var isActive = 0;
  if (document.getElementById("user_active").checked == true) {
    isActive = 1;
  }
  var isAdmin = 0;
  if (document.getElementById("user_admin").checked == true) {
    isAdmin = 1;
  }
  var isCollaborator = 0;
  if (document.getElementById("user_collaborator").checked == true) {
    isCollaborator = 1;
  }

  var isIpOnly = 0;
  if (document.getElementById("user_ip").checked == true) {
    isIpOnly = 1;
  }
  var canSeeUser = 0;
  if (document.getElementById("user_see_user").checked == true) {
    canSeeUser = 1;
  }
  var canSeeStats = 0;
  if (document.getElementById("user_see_stats").checked == true) {
    canSeeStats = 1;
  }
  var canSeeExport = 0;
  if (document.getElementById("user_see_export").checked == true) {
    canSeeExport = 1;
  }
  var canSeeCusVafi = 0;
  if (document.getElementById("user_see_cus_vafi").checked == true) {
    canSeeCusVafi = 1;
  }
  var canSeeCusHistory = 0;
  if (document.getElementById("user_see_cus_history").checked == true) {
    canSeeCusHistory = 1;
  }

  var canSeeCusDetails = 0;
  if (document.getElementById("user_see_cus_details").checked == true) {
    canSeeCusDetails = 1;
  }
  var canSeeCash = 0;
  if (document.getElementById("user_see_cash").checked == true) {
    canSeeCash = 1;
  }
  var canSeeSms = 0;
  if (document.getElementById("user_see_sms").checked == true) {
    canSeeSms = 1;
  }
  var canSeeSettings = 0;
  if (document.getElementById("user_see_settings").checked == true) {
    canSeeSettings = 1;
  }

  // PREPARE JSON OBJECT
  var insert_new_user = {
    id: 1,
    username: $("#user_username").val(),
    pass: $("#user_password").val(),
    name: $("#user_name").val(),
    surname: $("#user_surname").val(),
    isActive: isActive,
    isAdmin: isAdmin,
    isCollaborator: isCollaborator,
    ip: isIpOnly,
    seeUser: canSeeUser,
    seeStats: canSeeStats,
    seeExport: canSeeExport,
    seeCusVafi: canSeeCusVafi,
    seeCusHistory: canSeeCusHistory,
    seeCusDetails: canSeeCusDetails,
    seeCash: canSeeCash,
    seeSms: canSeeSms,
    seeSettings: canSeeSettings,
  };

  // AJAX MAGIC
  $.ajax({
    url: urlInsertRaw,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(insert_new_user),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // DO NOTHIING
    },
    complete: function (data) {
      window.location.replace("people.html" + "?pid=" + generateRandomToken());
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error people: userInsertNew" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure people: userInsertNew" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
  document.getElementById("user_new").style.visibility = "hidden";
}

function people_check_before_delete(current_id, current_people_details) {
  // console.log('in cus_check_before_delete');
  // console.log(current_id + ' ' + current_cus_details);
  // PREPARE URL
  var delURL = serverURL + "/user/canDelUser/" + current_id;
  // AJAX MAGIC

  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      if (data == 0) {
        //// console.log('Cus can be deleted');
        document.getElementById("people_id").innerHTML = current_id;
        document.getElementById("people_details").innerHTML =
          current_people_details;
        document.getElementById("people_delete_error_message").innerHTML =
          "ΕΠΙΒΕΒΑΙΩΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_people_delete").style.visibility =
          "visible";
      } else {
        //// console.log('Cus can NOT be deleted');
        document.getElementById("people_id").innerHTML = current_id;
        document.getElementById("people_details").innerHTML =
          current_people_details;
        document.getElementById("people_delete_error_message").innerHTML =
          "ΑΠΑΓΟΡΕΥΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_people_delete").style.visibility =
          "hidden";
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error people: people_check_before_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure people: people_check_before_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function people_delete() {
  // console.log('in cus_delete');

  var current_id = document.getElementById("people_id").innerHTML;
  var current_people_details =
    document.getElementById("people_details").innerHTML;
  // console.log(current_id + ' ' + current_cus_details);

  // PREPARE URL
  var delURL = serverURL + "/user/delUser/" + current_id;
  // AJAX MAGIC

  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      var table = $("#usertable").DataTable();
      var filteredData = table
        .rows()
        .indexes()
        .filter(function (value, index) {
          return table.row(value).data()[0] == current_id;
        });

      table.rows(filteredData).remove().draw();
      alert("Ο Συνεργάτης: " + current_people_details + " διαγράφηκε. ");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error people: people_delete" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure people: people_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
