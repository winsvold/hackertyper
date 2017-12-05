export function codeGetter(numberOfLetters) {
    return code.slice(0,numberOfLetters);
}

export const code = `ENVIRONMENT DIVISION.
INPUT-OUTPUT SECTION.
FILE-CONTROL.
	SELECT VESSEL-FILE ASSIGN TO "UVMF.DAT"
                 ORGANIZATION IS LINE SEQUENTIAL.

	SELECT WORK-FILE ASSIGN TO "WORK.DAT".

	SELECT SORTED-FILE ASSIGN TO "SORTED.DAT"
                 ORGANIZATION IS LINE SEQUENTIAL.

	SELECT PRINT-FILE ASSIGN TO "USSRSHIP.RPT".

IDENTIFICATION DIVISION.
PROGRAM-ID.  DP173EXAM.

ENVIRONMENT DIVISION.
INPUT-OUTPUT SECTION.
FILE-CONTROL.
	SELECT VESSEL-FILE ASSIGN TO "UVMF.DAT"
                 ORGANIZATION IS LINE SEQUENTIAL.

	SELECT WORK-FILE ASSIGN TO "WORK.DAT".

	SELECT SORTED-FILE ASSIGN TO "SORTED.DAT"
                 ORGANIZATION IS LINE SEQUENTIAL.

	SELECT PRINT-FILE ASSIGN TO "USSRSHIP.RPT".

DATA DIVISION.
FILE SECTION.

01	WH-OTHER-VARIABLES.
	02	WH-PREVIOUS-TYPE		PIC 99.
	02	WH-PREVIOUS-LOCATION		PIC X.
	02	WH-MONTHLY-TOTAL		PIC 9(8).

PROCEDURE DIVISION.
MAIN SECTION.
10-START.
	SORT WORK-FILE 
		ON ASCENDING KEY FB-LOCATION-CODE
				 FB-VESSEL-TYPE
		INPUT PROCEDURE IS SELECT-MAJOR-SHIPS
		GIVING SORTED-FILE.
	
	OPEN INPUT SORTED-FILE.
	OPEN OUTPUT PRINT-FILE.
	READ SORTED-FILE
		AT END MOVE "YES" TO IS-IT-END-OF-FILE.
	MOVE SPACES TO FD-PRINT-RECORD.
	WRITE FD-PRINT-RECORD AFTER ADVANCING PAGE.
	WRITE FD-PRINT-RECORD FROM WB-MAIN-HEADING
		AFTER ADVANCING 1 LINES.
	WRITE FD-PRINT-RECORD FROM WC-TITLES
		AFTER ADVANCING 3 LINES.
	PERFORM 20-PRODUCE-REPORT
		UNTIL END-OF-FILE.
	CLOSE PRINT-FILE
	      SORTED-FILE.
	STOP RUN.

text=list(text)
values= list()
reverse=list()
def encryptChar(target):
    #encrytion algorithm
    target=(((target+42)*PI)-449)
    return target

def decryptChar(target):
    target=(((target+449)/PI)-42)
    return target

def encrypt(input_text):
    input_text_list=list(input_text)
    col_values=list()
    for i in range (len(input_text_list)):
        current=ord(input_text_list[i])
        current=encryptChar(current)
        col_values.append(current)
    return col_values

def decrypt(enc_text):
    enc_list
    for i in range (len(input_text_list)):
        current=int(decryptChar(values[i]))
        current=chr(current)
        col_values.append(current)
    return col_values

def readAndDecrypt(filename):
    file=open(filename,"r")
    data=file.read()
    datalist=list()
    datalistint=list()
    actualdata=list()
    datalist=data.split(" ")
    datalist.remove('')
    for i in range(len(datalist)):
        datalistint.append(float(datalist[i]))
    for i in range(len(datalist)):
        current1=int(decryptChar(datalistint[i]))
        current1=chr(current1)
        actualdata.append(current1)
    return actualdata

def readAndEncrypt(filename):
    file=open(filename,"r")
    data=file.read()
    datalist=list(data)
    encrypted_list=list()
    encrypted_list_str=list()
    for i in range(len(datalist)):
        current=ord(datalist[i])
        current=encryptChar(current)
        encrypted_list.append(current)
    return encrypted_list

def readAndEncryptAndSave(inp_file,out_file):
    enc_list=readAndEncrypt(inp_file)
    output=open(out_file,"w")
    for i in range(len(enc_list)):
        output.write(str(enc_list[i])+" ")
    output.close()

def readAndDecryptAndSave(inp_file,out_file):
    dec_list=readAndDecrypt(inp_file)
    output=open(out_file,"w")
    for i in range(len(dec_list)):
        output.write(str(dec_list[i]))
    output.close()
#encryption
for i in range (len(text)):
    current=ord(text[i])
    current=encryptChar(current)
    values.append(current)

#decryption
for i in range (len(text)):
    current=int(decryptChar(values[i]))
    current=chr(current)
    reverse.append(current)
print(reverse)

#saves encrypted in txt file
output=open("encrypted.txt","w")
for i in range(len(values)):
    output.write(str(values[i])+" ")
output.close()

#read and decrypts
print(readAndDecrypt("encrypted.txt"))

$ SET SOURCEFORMAT"FREE"

FD      VESSEL-FILE.
01      FA-VESSEL-RECORD.
	02	FA-VESSEL-NAME			PIC X(20).
	02	FA-VESSEL-TYPE			PIC 99.
		88   SUBMARINE    VALUE  5,6.
	02	FA-TONNAGE			PIC 9(6).
		88   MAJOR-VESSEL VALUE   3500 THRU 999999.
	02	FA-CREW				PIC 9(5).
	02	FA-LOCATION-CODE		PIC X.

SD	WORK-FILE.
01	FB-WORK-RECORD.
	02	FILLER				PIC X(20).
	02	FB-VESSEL-TYPE			PIC 99.
	02	FILLER				PIC 9(6).
	02	FILLER				PIC 9(5).
	02	FB-LOCATION-CODE		PIC X.

FD	SORTED-FILE.
01	FC-VESSEL-RECORD.
	02	FC-VESSEL-NAME			PIC X(20).
	02	FC-TYPE				PIC 99.
	02	FC-TONNAGE			PIC 9(6).
	02	FC-CREW				PIC 9(5).
	02	FC-LOCATION			PIC 9.

FD      PRINT-FILE.
01      FD-PRINT-RECORD				PIC X(97).

WORKING-STORAGE SECTION.
01	WA-DETAIL-LINE.
	02	WA-PRINT-LOCATION		PIC X(17).
	02	WA-PRINT-FUNCTION		PIC BBX(22).
	02	WA-PRINT-NAME			PIC BBX(20).
	02	WA-PRINT-TONNAGE		PIC BBBBZZZ,ZZ9.
	02	WA-PRINT-CREW			PIC BBZZ,ZZ9.
	02	WA-PRINT-MONTHLY-COST		PIC BBB$$$,$$$,$$9.

01	WB-MAIN-HEADING.
	02	FILLER				PIC X(25) VALUE SPACES.
	02	FILLER				PIC X(42)
		VALUE "U.S.S.R.  NAVAL  VESSEL  INVENTORY  REPORT".

01	WC-TITLES.
	02	FILLER				PIC X(47)
		VALUE "  LOCATION NAME       VESSEL  FUNCTION       ".
	02	FILLER				PIC X(50)
		VALUE "VESSEL   NAME       TONNAGE   CREW    MONTHLY COST".

01	WD-NAME-TABLE.
	02	WD-TABLE-VALUES.
		03	FILLER	PIC X(22) VALUE "AIRCRAFT CARRIER      ".
		03	FILLER	PIC X(22) VALUE "CRUISER/BATTLESHIP    ".
		03	FILLER	PIC X(22) VALUE "DESTROYER             ".
		03	FILLER	PIC X(22) VALUE "FRIGATE               ".
		03	FILLER	PIC X(22) VALUE "NUCLEAR SUBMARINE     ".
		03	FILLER	PIC X(22) VALUE "CONVENTIONAL SUBMARINE".
		03	FILLER	PIC X(22) VALUE "ASSAULT SHIP          ".
		03	FILLER	PIC X(22) VALUE "SUPPLY SHIP           ".
		03	FILLER	PIC X(22) VALUE "CORVETTE              ".
		03	FILLER	PIC X(22) VALUE "MINE LAYER/HUNTER     ".
		03	FILLER	PIC X(22) VALUE "FAST ATTACK CRAFT     ".
		03	FILLER	PIC X(22) VALUE "COSTAL PATROL CRAFT   ".

	02	FILLER REDEFINES WD-TABLE-VALUES.
		03	WD-VESSEL-FUNCTION 	PIC X(22) OCCURS 12 TIMES.

01	WE-RATE-TABLE.
	02      WE-TABLE-VALUES.
		03	FILLER 			PIC X(48)
		      VALUE "261023502050099925502510078906320770087007500636".
		03	FILLER 			PIC X(48)
		      VALUE "256023000960098624362400071006110720083307100606".
		03	FILLER 			PIC X(48)
		      VALUE "240020100960086022002386067005500700080006850596".
		03	FILLER 			PIC X(48)
		      VALUE "258623352100099624862435076006050750085007400620".
		03	FILLER 			PIC X(48)
		      VALUE "250021850900091024002336069605860716083006960610".

	02	FILLER REDEFINES WE-TABLE-VALUES.
		03	WE-LOCATION OCCURS 5 TIMES.
			04	WE-VESSEL-TYPE OCCURS 12 TIMES.
				05 	WE-MONTHLY-RATE    PIC 9(4).

01	WF-LOCATION-TABLE.
	02	WF-TABLE-VALUES.
		03	FILLER	PIC X(17)	VALUE "THE PACIFIC      ".
		03	FILLER  PIC X(17)	VALUE "THE ATLANTIC     ".
		03	FILLER  PIC X(17)	VALUE "THE MEDITERRANEAN".
		03	FILLER  PIC X(17)	VALUE "THE INDIAN OCEAN ".
		03	FILLER  PIC X(17)	VALUE "THE OTHER SEAS   ".

	02	FILLER REDEFINES WF-TABLE-VALUES.
		03	WF-LOCATION	PIC X(17)      OCCURS 5 TIMES.

01	WG-FLAGS.
	02	IS-IT-END-OF-FILE		PIC X(3).
		88	END-OF-FILE		VALUE "YES".

20-PRODUCE-REPORT.
	MOVE FC-LOCATION TO WH-PREVIOUS-LOCATION.
	MOVE WF-LOCATION(FC-LOCATION) TO WA-PRINT-LOCATION.
	PERFORM 30-PRODUCE-REPORT-FOR-LOCATION
		UNTIL FC-LOCATION NOT EQUAL TO WH-PREVIOUS-LOCATION
		      OR 
		END-OF-FILE.

30-PRODUCE-REPORT-FOR-LOCATION.
	MOVE FC-TYPE TO WH-PREVIOUS-TYPE.
	MOVE WD-VESSEL-FUNCTION(FC-TYPE) TO WA-PRINT-FUNCTION.
	PERFORM 40-PRODUCE-FUNCTION-REPORT
		UNTIL FC-TYPE NOT EQUAL TO WH-PREVIOUS-TYPE
			OR
		FC-LOCATION NOT EQUAL TO WH-PREVIOUS-LOCATION
 			OR
		END-OF-FILE.

40-PRODUCE-FUNCTION-REPORT.
	MULTIPLY FC-CREW BY WE-MONTHLY-RATE(FC-LOCATION, FC-TYPE)
		GIVING WH-MONTHLY-TOTAL.
	MOVE WH-MONTHLY-TOTAL TO WA-PRINT-MONTHLY-COST.
	MOVE FC-CREW TO WA-PRINT-CREW.
	MOVE FC-TONNAGE TO WA-PRINT-TONNAGE.
	MOVE FC-VESSEL-NAME TO WA-PRINT-NAME.
	WRITE FD-PRINT-RECORD FROM WA-DETAIL-LINE
		AFTER ADVANCING 2 LINES.
	MOVE SPACES TO WA-DETAIL-LINE.
	READ SORTED-FILE
		AT END MOVE "YES" TO IS-IT-END-OF-FILE.

SELECT-MAJOR-SHIPS SECTION.
10-START-PROCEDURE.
	OPEN INPUT VESSEL-FILE.
	READ VESSEL-FILE
		AT END MOVE "YES" TO IS-IT-END-OF-FILE.
	PERFORM 20-GET-MAJOR-VESSELS UNTIL END-OF-FILE.
	CLOSE VESSEL-FILE.
	MOVE  "NO" TO IS-IT-END-OF-FILE.
	GO TO 30-EXIT-SELECT-MAJOR-SHIPS.
	
20-GET-MAJOR-VESSELS.
	IF SUBMARINE OR MAJOR-VESSEL
		RELEASE FB-WORK-RECORD
			FROM FA-VESSEL-RECORD.
	READ VESSEL-FILE
		AT END MOVE "YES" TO IS-IT-END-OF-FILE.

30-EXIT-SELECT-MAJOR-SHIPS.
	EXIT.
 `;