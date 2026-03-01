// ----------------- FOR INDEX: LOGIN PAGE ----------------- //
function clearLoginForm() {
  document.getElementById("globalId").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  // TODO: Delete localStorage objs
  localStorageDeleteAll();
}

async function prepareCredsLoginCheck() {
  current_globalId = document.getElementById("globalId").value;
  current_username = document.getElementById("username").value;
  current_password = document.getElementById("password").value;

  console.log(
    "In prepareCredsLoginCheck2 current_globalId: " + current_globalId
  );

  // Delete lcGlobalId
  await localStorageDeleteGlobalId();
  // Write lcGlobalId
  await localStorageWriteGlobalId(current_globalId);
}
// CHECK CREDENTIALS FOR INDEX
async function ajaxCredsLoginCheck() {
  return $.ajax({
    url: loginServerURL + "/creds/byUsername/" + current_username,
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT

      // console.log('is_admin ' + is_admin);
      if (data == null) {
        alert("Wrong credentials. Access denied.");
        // erase all
      } else {
        var db_username = data.username;
        var db_pass = data.pass;
        var db_name = data.name;
        var db_surname = data.surname;
        var db_isActive = data.isActive;
        var db_isAdmin = data.isAdmin;
        var db_isCollaborator = data.isCollaborator;
        var db_checkIp = data.checkIp;
        var db_seeUser = data.seeUser;
        var db_seeStats = data.seeStats;
        var db_seeExport = data.seeExport;
        var db_seeCusVafi = data.seeCusVafi;
        var db_seeCusHistory = data.seeCusHistory;
        var db_seeCusDetails = data.seeCusDetails;
        var db_seeCash = data.seeCash;
        var db_seeSms = data.seeSms;
        var db_seeSettings = data.seeSettings;

        var db_globalId = data.globalId;
        var db_eponymia = data.eponymia;
        var db_titlos = data.titlos;
        var db_plan = data.plan;
        var db_timeoutsecs = data.timeoutsecs;
        var db_has_sms = data.hasSms;
        var db_expDate = data.expDate;
        var db_ip = data.ip;
        var db_sms_ypoloipo = data.smsYpoloipo;
        var db_cus_sex = data.cusSex;

        // CHECK EXP_DATE
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;
        var db_expDateDt = Date.parse(db_expDate);
        var currentDateDt = Date.parse(today);
        if (isIOS) {
          let dateArr = today.split(/[- : \/]/);
          currentDateDt = Date.parse(
            dateArr[0],
            dateArr[1] - 1,
            dateArr[2],
            dateArr[3],
            dateArr[4],
            dateArr[5]
          );
          //alert('dateArr: ' + dateArr);
          //alert('db_expDateDt: ' + db_expDateDt);
          //alert('currentDateDt: ' + currentDateDt);
          //alert('currentDateDt: ' + currentDateDt);
        }
        //alert('In login.js?ver=492 isIOS: ' + isIOS);

        //// console.log('today is: ' + today);

        if (
          (db_checkIp == 1 && curr_ip_egatastasis == db_ip) ||
          db_checkIp == 0
        ) {
          if (db_expDateDt >= currentDateDt) {
            if (
              current_globalId == db_globalId &&
              current_username == db_username &&
              current_password == db_pass
            ) {
              if (db_isAdmin == 1) {
                // Write on Localstorage
                localStorageWtite(
                  db_username,
                  db_name,
                  db_surname,
                  db_isActive,
                  db_isAdmin,
                  db_isCollaborator,
                  db_checkIp,
                  db_seeUser,
                  db_seeStats,
                  db_seeExport,
                  db_seeCusVafi,
                  db_seeCusHistory,
                  db_seeCusDetails,
                  db_globalId,
                  db_eponymia,
                  db_titlos,
                  db_plan,
                  db_timeoutsecs,
                  db_has_sms,
                  db_expDate,
                  db_ip,
                  db_sms_ypoloipo,
                  db_seeCash,
                  db_seeSms,
                  db_seeSettings,
                  db_cus_sex
                );
                // GO TO active_tabs.html
                /*
                console.log(
                  loginServerURL + "/creds/byUsername/" + current_username
                );
                */
                // console.log("db_plan: " + db_plan);


                if (db_plan == "L") {
                  setTimeout(function () { window.location.replace("active_tabs.html" + "?pid=" + generateRandomToken() );
                }, 500); // Half second delay
                }
                if (db_plan == "S" || db_plan == "M") {
                  setTimeout(function () { window.location.replace("cus.html" + "?pid=" + generateRandomToken() );
                }, 500); // Half second delay 
                }



                // window.location.replace("active_tabs.html" + "?pid=" + generateRandomToken());
              } else {
                // Write on Localstorage
                localStorageWtite(
                  db_username,
                  db_name,
                  db_surname,
                  db_isActive,
                  db_isAdmin,
                  db_isCollaborator,
                  db_checkIp,
                  db_seeUser,
                  db_seeStats,
                  db_seeExport,
                  db_seeCusVafi,
                  db_seeCusHistory,
                  db_seeCusDetails,
                  db_globalId,
                  db_eponymia,
                  db_titlos,
                  db_plan,
                  db_timeoutsecs,
                  db_has_sms,
                  db_expDate,
                  db_ip,
                  db_sms_ypoloipo,
                  db_seeCash,
                  db_seeSms,
                  db_seeSettings,
                  db_cus_sex
                );
                // GO TO collaborattor.html
                window.location.replace(
                  "../collab/cus.html" + "?pid=" + generateRandomToken()
                );
                //  alert('User is not admin.');
              }
            } else {
              document.getElementById("password").value = "";
              alert("Λάθος password. Ξαναπροσπαθήστε.");
            }
          } // CHEK DATE
          else {
            alert(
              "Η συνδρομή σας έχει λήξει στις " +
                db_expDate +
                ". Επικοινωνήστε με την LECS.gr για την ανανέωση. Ευχαριστούμε."
            );
          }
        } else {
          alert("Απαγόρευση εισόδου εκτός εγκατάστασης.");
        }
      } // if data is not null
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error login: ajaxCredsLoginCheck" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure login: ajaxCredsLoginCheck" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
async function executeCredsLoginCheck() {
  try {
    await prepareCredsLoginCheck();
    await formLoginServerUrl();
    const resCredsLoginCheck = await ajaxCredsLoginCheck();
  } catch (err) {
    console.log(err);
  }
}

function loadLustLoggedInUser() {
  if (localStorage.getItem("lcObj") !== null) {
    // alert('lcObj exist');
    lcObjLocal = JSON.parse(localStorage.getItem("lcObj"));
    document.getElementById("globalId").value = lcObjLocal.globalId;
    document.getElementById("username").value = lcObjLocal.username;
    document.getElementById("password").focus();
  }
  /*
    if (localStorage.getItem("lcGlobalId") !== null) {
        // Delete lcGlobalId
        localStorageDeleteGlobalId();
    }
    */
}

// ----------------- FOR ALL OTHER PAGES EXCEPT INDEX: LOGIN PAGE ----------------- //
function credsAppOtherCheck() {
  if (localStorage.getItem("lcObj") !== null) {
    // alert('lcObj exist');
    lcObjLocal = JSON.parse(localStorage.getItem("lcObj"));

    // FOR ACTIVE_TABS_NEW PAGE
    seeCusDetails = lcObjLocal.seeCusDetails;
    seeCusVafi = lcObjLocal.seeCusVafi;
    seeCusHistory = lcObjLocal.seeCusHistory;
    seeExport = lcObjLocal.seeExport;

    if (lcObjLocal.username != "") {
      var current_globalId = lcObjLocal.globalId;
      var current_username = lcObjLocal.username;

      $.ajax({
        url: serverURL + "/creds/byUsername/" + current_username,
        dataType: "json",
        success: function (data) {
          // GET DATA FROM JSON OBJECT

          // console.log('is_admin ' + is_admin);
          if (data == null) {
            alert("Wrong credentials. Access denied.");
            window.location.replace(
              "index.html" + "?pid=" + generateRandomToken()
            );
            // erase all
          } else {
            var db_username = data.username;
            var db_pass = data.pass;
            var db_name = data.name;
            var db_surname = data.surname;
            var db_isActive = data.isActive;
            var db_isAdmin = data.isAdmin;
            var db_isCollaborator = data.isCollaborator;
            var db_checkIp = data.checkIp;
            var db_seeUser = data.seeUser;
            var db_seeStats = data.seeStats;
            var db_seeExport = data.seeExport;
            var db_seeCusVafi = data.seeCusVafi;
            var db_seeCusHistory = data.seeCusHistory;
            var db_seeCusDetails = data.seeCusDetails;
            var db_seeCash = data.seeCash;
            var db_seeSms = data.seeSms;
            var db_seeSettings = data.seeSettings;

            var db_globalId = data.globalId;
            var db_eponymia = data.eponymia;
            var db_titlos = data.titlos;
            var db_plan = data.plan;
            var db_timeoutsecs = data.timeoutsecs;
            var db_has_sms = data.hasSms;
            var db_expDate = data.expDate;
            var db_ip = data.ip;
            var db_sms_ypoloipo = data.smsYpoloipo;
            var db_cus_sex = data.cusSex;

            if (
              current_globalId == db_globalId &&
              current_username == db_username
            ) {
              if (db_isAdmin == 1) {
                // Write on Localstorage
                localStorageWtite(
                  db_username,
                  db_name,
                  db_surname,
                  db_isActive,
                  db_isAdmin,
                  db_isCollaborator,
                  db_checkIp,
                  db_seeUser,
                  db_seeStats,
                  db_seeExport,
                  db_seeCusVafi,
                  db_seeCusHistory,
                  db_seeCusDetails,
                  db_globalId,
                  db_eponymia,
                  db_titlos,
                  db_plan,
                  db_timeoutsecs,
                  db_has_sms,
                  db_expDate,
                  db_ip,
                  db_sms_ypoloipo,
                  db_seeCash,
                  db_seeSms,
                  db_seeSettings,
                  db_cus_sex
                );
                // DO NOTHING
              } else {
                // Write on Localstorage
                localStorageWtite(
                  db_username,
                  db_name,
                  db_surname,
                  db_isActive,
                  db_isAdmin,
                  db_isCollaborator,
                  db_checkIp,
                  db_seeUser,
                  db_seeStats,
                  db_seeExport,
                  db_seeCusVafi,
                  db_seeCusHistory,
                  db_seeCusDetails,
                  db_globalId,
                  db_eponymia,
                  db_titlos,
                  db_plan,
                  db_timeoutsecs,
                  db_has_sms,
                  db_expDate,
                  db_ip,
                  db_sms_ypoloipo,
                  db_seeCash,
                  db_seeSms,
                  db_seeSettings,
                  db_cus_sex
                );
                // GO TO index.html
                window.location.replace(
                  "index.html" + "?pid=" + generateRandomToken()
                );
              }
            } else {
              // localStorageWtite(db_username, db_name, db_surname, db_isActive, db_isAdmin, db_isCollaborator, db_globalId, db_eponymia);
              window.location.replace(
                "index.html" + "?pid=" + generateRandomToken()
              );
            }
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          write_to_log(
            "Error login: credsAppOtherCheck" +
              " " +
              textStatus +
              " - " +
              errorThrown
          );
          alert("Error gasoum: " + textStatus + " - " + errorThrown);
        },
        failure: function (errMsg) {
          write_to_log("Failure login: credsAppOtherCheck" + " " + errMsg);
          alert("Failure: Ο server δεν ανταποκρίθηκε");
        },
      });
    } else {
      window.location.replace("index.html" + "?pid=" + generateRandomToken());
    }
  }
}

function localStorageReadGlobalId() {
  console.log("In localStorageReadGlobalId:");
  lcGlobalIdLocal = JSON.parse(localStorage.getItem("lcGlobalId"));
  return lcGlobalIdLocal.globalId;
}

function localStorageDeleteAll() {
  localStorage.removeItem("lcObj");
  localStorage.removeItem("lcGlobalId");
}

function localStorageWtite(
  db_username,
  db_name,
  db_surname,
  db_isActive,
  db_isAdmin,
  db_isCollaborator,
  db_checkIp,
  db_seeUser,
  db_seeStats,
  db_seeExport,
  db_seeCusVafi,
  db_seeCusHistory,
  db_seeCusDetails,
  db_globalId,
  db_eponymia,
  db_titlos,
  db_plan,
  db_timeoutsecs,
  db_has_sms,
  db_expDate,
  db_ip,
  db_sms_ypoloipo,
  db_seeCash,
  db_seeSms,
  db_seeSettings,
  db_cus_sex
) {
  lcObj = {
    username: db_username,
    name: db_name,
    surname: db_surname,
    isActive: db_isActive,
    isAdmin: db_isAdmin,
    isCollaborator: db_isCollaborator,
    checkIp: db_checkIp,
    seeUser: db_seeUser,
    seeStats: db_seeStats,
    seeExport: db_seeExport,
    seeCusVafi: db_seeCusVafi,
    seeCusHistory: db_seeCusHistory,
    seeCusDetails: db_seeCusDetails,
    globalId: db_globalId,
    eponymia: db_eponymia,
    titlos: db_titlos,
    hasSms: db_has_sms,
    plan: db_plan,
    timeoutsecs: db_timeoutsecs,
    expDate: db_expDate,
    ip: db_ip,
    sms_ypoloipo: db_sms_ypoloipo,
    seeCash: db_seeCash,
    seeSms: db_seeSms,
    seeSettings: db_seeSettings,
    cusSex: db_cus_sex
  };

  lcObj_serialized = JSON.stringify(lcObj);

  localStorage.setItem("lcObj", lcObj_serialized);
  // console.log(localStorage.getItem("lcObj"));
}

function showUserName() {
  if (localStorage.getItem("lcObj") !== null) {
    lcObjLocal = JSON.parse(localStorage.getItem("lcObj"));
    // alert('showUserName');
    document.getElementById("username").innerHTML = lcObjLocal.name;
  }
}
