////////////////////////////////////////////////////////////////////////////////
//
// Convert to Roman pronunciation
//
// Added by dyhan81
//
////////////////////////////////////////////////////////////////////////////////
function convert(str) {
	var ret;
	var codes = HanToHanPhonemeCodes(str);
	var fcodes;
	
	// ret = HanPhonemeCodesToRoma(fcodes = Pronunciation(codes));
	// ret += '('+'←'+HanPhonemeCodesToHan(fcodes)+'←'+str+')';
	ret = HanPhonemeCodesToRoma(Pronunciation(codes));
	
	return ret;
}

// 한글 -> 한글 음소 코드
function HanToHanPhonemeCodes(str) {
	var startIndexOfHangulUnicode = 0xAC00; // '가'
	var endIndexOfHangulUnicode   = 0xD7A3; // '힣'
	

	var numberOfInitialPhoneme   = 19;     // ㄱ,ㄲ,ㄴ,ㄷ,ㄸ,ㄹ,ㅁ,ㅂ,ㅃ,ㅅ,ㅆ,ㅇ,ㅈ,ㅉ,ㅊ,ㅋ,ㅌ,ㅍ,ㅎ
	var numberOfMedialPhoneme    = 21;     // ㅏ,ㅐ,ㅑ,ㅒ,ㅓ,ㅔ,ㅕ,ㅖ,ㅗ,ㅘ,ㅙ,ㅚ,ㅛ,ㅜ,ㅝ,ㅞ,ㅟ,ㅠ,ㅡ,ㅢ,ㅣ
	var numberOfFinalPhoneme     = 28;     // (없음), ㄱ,ㄲ,ㄳ,ㄴ,ㄵ,ㄶ,ㄷ,ㄹ,ㄺ,ㄻ,ㄼ,ㄽ,ㄾ,ㄿ,ㅀ,ㅁ,ㅂ,ㅄ,ㅅ,ㅆ,ㅇ,ㅈ,ㅊ,ㅋ,ㅌ,ㅍ,ㅎ
	
	var numberOfPhonemesPerInitial = 21 * 28;

	
	var retPhonemeCodes = new Array();
	for (var i = 0; i < str.length; i++) {
		var unicode = str.charCodeAt(i);

		if (!(unicode >= startIndexOfHangulUnicode && unicode <= endIndexOfHangulUnicode)) {
			retPhonemeCodes[i*3] = -1;
			retPhonemeCodes[i*3+1] = unicode;
			retPhonemeCodes[i*3+2] = 0;
			continue;
		}
		
		var indexFromHangulStart = unicode - 0xAC00;
	
		var initialSIndex = parseInt(indexFromHangulStart / numberOfPhonemesPerInitial);
		var medialSIndex  = parseInt((indexFromHangulStart % numberOfPhonemesPerInitial) / numberOfFinalPhoneme);
		var finalSIndex   = (indexFromHangulStart % numberOfPhonemesPerInitial) % numberOfFinalPhoneme;

		retPhonemeCodes[i * 3]     = initialSIndex;
		retPhonemeCodes[i * 3 + 1] = medialSIndex;
		retPhonemeCodes[i * 3 + 2] = finalSIndex;
	}
	return retPhonemeCodes;
}

// 한글 음소 코드 -> 한글 음소
function HanPhonemeCodesToHanPhonemes(intArray) {
	var retString = "";
	for (var i=0; i < intArray.length; i+=3) {
		if (intArray[i] < 0) {
			retString += String.fromCharCode(intArray[i+1]);
			continue;
		}
		switch (intArray[i])
		{
			case (0):	retString += 'ㄱ';	break;
			case (1):	retString += 'ㄲ';	break;
			case (2):	retString += 'ㄴ';	break;
			case (3): retString += 'ㄷ'; break;
			case (4): retString += 'ㄸ'; break;
			case (5): retString += 'ㄹ'; break;
			case (6): retString += 'ㅁ'; break;
			case (7): retString += 'ㅂ'; break;
			case (8): retString += 'ㅃ'; break;
			case (9): retString += 'ㅅ'; break;
			case (10): retString += 'ㅆ'; break;
			case (11): retString += 'ㅇ'; break;
			case (12): retString += 'ㅈ'; break;
			case (13): retString += 'ㅉ'; break;
			case (14): retString += 'ㅊ'; break;
			case (15): retString += 'ㅋ'; break;
			case (16): retString += 'ㅌ'; break;
			case (17): retString += 'ㅍ'; break;
			case (18): retString += 'ㅎ'; break;
			case (19): retString += 'ㄹ'; break;
			default: retString += '?'; break;
		}
		switch (intArray[i+1])
		{ //ㅏ,ㅐ,ㅑ,ㅒ,ㅓ,ㅔ,ㅕ,ㅖ,ㅗ,ㅘ,ㅙ,ㅚ,ㅛ,ㅜ,ㅝ,ㅞ,ㅟ,ㅠ,ㅡ,ㅢ,ㅣ
			case (0):	retString += 'ㅏ';	break;
			case (1):	retString += 'ㅐ';	break;
			case (2):	retString += 'ㅑ';	break;
			case (3): retString += 'ㅒ'; break;
			case (4): retString += 'ㅓ'; break;
			case (5): retString += 'ㅔ'; break;
			case (6): retString += 'ㅕ'; break;
			case (7): retString += 'ㅖ'; break;
			case (8): retString += 'ㅗ'; break;
			case (9): retString += 'ㅘ'; break;
			case (10): retString += 'ㅙ'; break;
			case (11): retString += 'ㅚ'; break;
			case (12): retString += 'ㅛ'; break;
			case (13): retString += 'ㅜ'; break;
			case (14): retString += 'ㅝ'; break;
			case (15): retString += 'ㅞ'; break;
			case (16): retString += 'ㅟ'; break;
			case (17): retString += 'ㅠ'; break;
			case (18): retString += 'ㅡ'; break;
			case (19): retString += 'ㅢ'; break;
			case (20): retString += 'ㅣ'; break;
			default: retString += '?'; break;
		}
		switch (intArray[i+2])
		{ // (없음), ㄱ,ㄲ,ㄳ,ㄴ,ㄵ,ㄶ,ㄷ,ㄹ,ㄺ,ㄻ,ㄼ,ㄽ,ㄾ,ㄿ,ㅀ,ㅁ,ㅂ,ㅄ,ㅅ,ㅆ,ㅇ,ㅈ,ㅊ,ㅋ,ㅌ,ㅍ,ㅎ
			case (0):	retString += '';	break;
			case (1):	retString += 'ㄱ';	break;
			case (2):	retString += 'ㄲ';	break;
			case (3): retString += 'ㄳ'; break;
			case (4): retString += 'ㄴ'; break;
			case (5): retString += 'ㄵ'; break;
			case (6): retString += 'ㄶ'; break;
			case (7): retString += 'ㄷ'; break;
			case (8): retString += 'ㄹ'; break;
			case (9): retString += 'ㄺ'; break;
			case (10): retString += 'ㄻ'; break;
			case (11): retString += 'ㄼ'; break;
			case (12): retString += 'ㄽ'; break;
			case (13): retString += 'ㄾ'; break;
			case (14): retString += 'ㄿ'; break;
			case (15): retString += 'ㅀ'; break;
			case (16): retString += 'ㅁ'; break;
			case (17): retString += 'ㅂ'; break;
			case (18): retString += 'ㅄ'; break;
			case (19): retString += 'ㅅ'; break;
			case (20): retString += 'ㅆ'; break;
			case (21): retString += 'ㅇ'; break;
			case (22): retString += 'ㅈ'; break;
			case (23): retString += 'ㅊ'; break;
			case (24): retString += 'ㅋ'; break;
			case (25): retString += 'ㅌ'; break;
			case (26): retString += 'ㅍ'; break;
			case (27): retString += 'ㅎ'; break;
			default: retString += '?'; break;
		}
	}
	return retString;
}

// 한글 음소 코드 -> 한글
function HanPhonemeCodesToHan(intArray) {
	var retString = "";
	var initialPhoneme;
	var medialPhoneme;
	var finalPhoneme;
	for (var i=0; i < intArray.length; i+=3) {
		if (intArray[i] < 0) {
			retString += String.fromCharCode(intArray[i+1]);
			continue;
		}
		switch (intArray[i])
		{
			case (19): initialPhoneme = 5; break;
			default: initialPhoneme = intArray[i]; break;
		}
		switch (intArray[i+1])
		{ //ㅏ,ㅐ,ㅑ,ㅒ,ㅓ,ㅔ,ㅕ,ㅖ,ㅗ,ㅘ,ㅙ,ㅚ,ㅛ,ㅜ,ㅝ,ㅞ,ㅟ,ㅠ,ㅡ,ㅢ,ㅣ
			default: medialPhoneme = intArray[i+1]; break;
		}
		switch (intArray[i+2])
		{ // (없음), ㄱ,ㄲ,ㄳ,ㄴ,ㄵ,ㄶ,ㄷ,ㄹ,ㄺ,ㄻ,ㄼ,ㄽ,ㄾ,ㄿ,ㅀ,ㅁ,ㅂ,ㅄ,ㅅ,ㅆ,ㅇ,ㅈ,ㅊ,ㅋ,ㅌ,ㅍ,ㅎ
			default: finalPhoneme = intArray[i+2]; break;
		}
		retString += String.fromCharCode(0xAC00 + (21*28)*initialPhoneme+28*medialPhoneme+finalPhoneme);
		// retString += ','+ (0xAC00 + (21*28)*initialPhoneme+28*medialPhoneme+finalPhoneme);
		// retString += "("+initialPhoneme+","+medialPhoneme+","+finalPhoneme+")";
	}
	return retString;
}

// 한글 음소 코드 -> 로마자
function HanPhonemeCodesToRoma(intArray) {
	var retString = "";
	for (var i=0; i < intArray.length; i+=3) {
		if (intArray[i] < 0) {
			retString += String.fromCharCode(intArray[i+1]);
			continue;
		}
		switch (intArray[i])
		{ // ㄱ,ㄲ,ㄴ,ㄷ,ㄸ,ㄹ,ㅁ,ㅂ,ㅃ,ㅅ,ㅆ,ㅇ,ㅈ,ㅉ,ㅊ,ㅋ,ㅌ,ㅍ,ㅎ
			case (0):	retString += 'g';	break;  // ㄱ
			case (1):	retString += 'kk';	break;  // ㄲ
			case (2):	retString += 'n';	break;  // ㄴ
			case (3): retString += 'd'; break;  // ㄷ
			case (4): retString += 'tt'; break;  // ㄸ
			case (5): retString += 'r'; break;  // ㄹ
			case (6): retString += 'm'; break;  // ㅁ
			case (7): retString += 'b'; break;  // ㅂ
			case (8): retString += 'pp'; break;  // ㅃ
			case (9): retString += 's'; break;  // ㅅ
			case (10): retString += 'ss'; break; // ㅆ
			case (11): retString += ''; break; // ㅇ
			case (12): retString += 'j'; break; // ㅈ
			case (13): retString += 'jj'; break; // ㅉ
			case (14): retString += 'ch'; break; // ㅊ
			case (15): retString += 'k'; break; // ㅋ
			case (16): retString += 't'; break; // ㅌ
			case (17): retString += 'p'; break; // ㅍ
			case (18): retString += 'h'; break; // ㅎ
			case (19): retString += 'l'; break; // (ㄹ)
			default: retString += '?'; break;
		}
		switch (intArray[i+1])
		{ //ㅏ,ㅐ,ㅑ,ㅒ,ㅓ,ㅔ,ㅕ,ㅖ,ㅗ,ㅘ,ㅙ,ㅚ,ㅛ,ㅜ,ㅝ,ㅞ,ㅟ,ㅠ,ㅡ,ㅢ,ㅣ
			case (0):	retString += 'a';	break;  // ㅏ
			case (1):	retString += 'ae';	break;  // ㅐ
			case (2):	retString += 'ya';	break;  // ㅑ
			case (3): retString += 'yae';  break;  // ㅒ
			case (4): retString += 'eo';  break;  // ㅓ
			case (5): retString += 'e';  break;  // ㅔ
			case (6): retString += 'yeo';  break;  // ㅕ
			case (7): retString += 'ye';  break;  // ㅖ
			case (8): retString += 'o';  break;  // ㅗ
			case (9): retString += 'wa';  break;  // ㅘ
			case (10): retString += 'wae'; break;  // ㅙ
			case (11): retString += 'oe'; break;  // ㅚ
			case (12): retString += 'yo'; break;  // ㅛ
			case (13): retString += 'u'; break;  // ㅜ
			case (14): retString += 'wo'; break;  // ㅝ
			case (15): retString += 'we'; break;  // ㅞ
			case (16): retString += 'wi'; break;  // ㅟ
			case (17): retString += 'yu'; break;  // ㅠ
			case (18): retString += 'eu'; break;  // ㅡ
			case (19): retString += 'ui'; break;  // ㅢ
			case (20): retString += 'i'; break;  // ㅣ
			default: retString += '?'; break;
		}
		switch (intArray[i+2])
		{ // (없음), ㄱ,ㄲ,ㄳ,ㄴ,ㄵ,ㄶ,ㄷ,ㄹ,ㄺ,ㄻ,ㄼ,ㄽ,ㄾ,ㄿ,ㅀ,ㅁ,ㅂ,ㅄ,ㅅ,ㅆ,ㅇ,ㅈ,ㅊ,ㅋ,ㅌ,ㅍ,ㅎ
			case (0):	retString += '';	   break;  // (없음)
			case (1):	retString += 'k';	 break;  // ㄱ
			case (2):	retString += 'kk';	 break;  // ㄲ
			case (3): retString += 'k(gs)';  break;  // ㄳ
			case (4): retString += 'n';  break;  // ㄴ
			case (5): retString += 'n(nj)';  break;  // ㄵ
			case (6): retString += 'n(nh)';  break;  // ㄶ
			case (7): retString += 't';  break;  // ㄷ
			case (8): retString += 'l';  break;  // ㄹ
			case (9): retString += 'k(lg)';  break;  // ㄺ
			case (10): retString += 'm(lm)'; break;  // ㄻ
			case (11): retString += 'l(lb)'; break;  // ㄼ
			case (12): retString += 'l(ls)'; break;  // ㄽ
			case (13): retString += 'l(lt)'; break;  // ㄾ
			case (14): retString += 'p(lp)'; break;  // ㄿ
			case (15): retString += 'l(lh)'; break;  // ㅀ
			case (16): retString += 'm'; break;  // ㅁ
			case (17): retString += 'p'; break;  // ㅂ
			case (18): retString += 'p(bs)'; break;  // ㅄ
			case (19): retString += 's'; break;  // ㅅ
			case (20): retString += 'ss'; break;  // ㅆ
			case (21): retString += 'ng'; break;  // ㅇ
			case (22): retString += 'j'; break;  // ㅈ
			case (23): retString += 'ch'; break;  // ㅊ
			case (24): retString += 'k'; break;  // ㅋ
			case (25): retString += 't'; break;  // ㅌ
			case (26): retString += 'p'; break;  // ㅍ
			case (27): retString += 'h'; break;  // ㅎ
			default: retString += '?'; break;
		}
	}
	return retString;
}

// 로마자 -> 한글 음소 코드
function RomaToHanPhonemeCodes(str) {
	
}

/*------------------------------
  한글 음소 코드 -> 표준 발음 음소 코드
  (주의) 로마자 변환을 위한 발음 변화만을 반영하였으므로, 된소리화 같은 변화는
     반영하지 않았음. (로마자 표기시 발음의 된소리 화는 무시함)
*/
function Pronunciation(codes) {
	/* [초성]
	   ㄱ: 0:g,  ㄲ: 1:kk, ㄴ: 2:n, ㄷ: 3:d,  ㄸ: 4:tt,   ㄹ: 5:r, ㅁ: 6:m, 
	   ㅂ: 7:b,  ㅃ: 8:pp, ㅅ: 9:s, ㅆ:10:ss, ㅇ:11:(),   ㅈ:12:j, ㅉ:13:jj,
	   ㅊ:14:ch, ㅋ:15:k,  ㅌ:16:t, ㅍ:17:p,  ㅎ:18:h , (ㄹ):19:l
	*/
	/* [종성]
	   (): 0: ,     ㄱ: 1:k,     ㄲ: 2:kk,    ㄳ: 3:k(gs), ㄴ: 4:n,      
	   ㄵ: 5:n(nj), ㄶ: 6:n(nh), ㄷ: 7:t,	    ㄹ: 8:l,     ㄺ: 9:k(lg),  
	   ㄻ:10:m(lm), ㄼ:11:l(lb), ㄽ:12:l(ls), ㄾ:13:l(lt), ㄿ:14:p(lp), 
	   ㅀ:15:l(lh), ㅁ:16:m,     ㅂ:17:p,     ㅄ:18:p(bs), ㅅ:19:s,     
	   ㅆ:20:ss,    ㅇ:21:ng,    ㅈ:22:j,     ㅊ:23:ch,    ㅋ:24:k, 
	   ㅌ:25:t,     ㅍ:26:p,     ㅎ:27:h
	*/
	var ret = new Array();
	for (var i=0; i<codes.length; i++) {
		ret[i] = codes[i];
	}
	
	for (var i=0; i<ret.length; i+=3) {

		// 표준어발음법 제4장 8항: 

		// (예외1: 구개음화) 받침 'ㄷ, ㅌ'이 모음 'ㅣ'앞에서 'ㅈ, ㅊ'이 되는 경우
		if (ret[i+2] == 7 && ret[i+3] == 11 && (ret[i+4] == 20 || ret[i+4] == 2 || ret[i+4] == 6)) {
			ret[i+2] = 0;  // 종성: 'ㄹ'(l)
			ret[i+3] = 12;
		}
		if (ret[i+2] == 25 && ret[i+3] == 11 && (ret[i+4] == 20 || ret[i+4] == 2 || ret[i+4] == 6)) {
			ret[i+2] = 0;  // 종성: 'ㄹ'(l)
			ret[i+3] = 14;
		}
		
		// (예외2: 'ㄼ')
		//  1. 밟 - 자음 앞에서 'ㅂ'으로 발음
		if (ret[i] == 7 && ret[i+1] == 0 && ret[i+2] == 11 && ret[i+3] != 11)
			ret[i+2] = 17;  // 종성: 'ㅂ'(l)
		//  2. 넓 - 넓죽(하다), 넓둥(글다)의 경우 'ㅂ'으로 발음 (+ 다음 초성 된소리)
		if (  ret[i]   ==  2 && ret[i+1] ==  4 && ret[i+2] == 11 &&
		    ((ret[i+3] == 12 && ret[i+4] == 13) ||
		     (ret[i+3] ==  3 && ret[i+4] == 13)) )
			ret[i+2] = 17;
			
		// (예외3: 'ㄺ') 용언의 어간 발음 'ㄺ'은 'ㄱ'앞에서 'ㄹ'로 발음된다.
		if ( ret[i+2] == 9 && ret[i+3] == 0 )
			ret[i+2] = 8;
			
		// (예외4: 제12항 'ㅎ') 4. 'ㅎ(ㄴㅎ,ㄹㅎ)'뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우에는, 'ㅎ'을 발음하지 않는다.
		if ( (ret[i+2] == 27 || ret[i+2] == 6 || ret[i+2] == 15) && ret[i+3] == 11 )
			ret[i+2] = 0; // 나머지는 [받침 소리 규칙]에서 처리

		// (예외5: 'ㅍ') 'ㅍ'뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우.
		if ( ret[i+2] == 26 && ret[i+3] == 11 )
		{
			ret[i+2] = 0;
			ret[i+3] = 17;
		}

		// 연음 법칙 (종성이 다음 모음에서 발음 되는 법칙)
		// (+)
		// 제 14 항 겹받침이 모음으로 시작된 조사나 어미, 접미사와 결합되는 
		//    경우에는, 뒤엣것만을 뒤 음절 첫소리로 옮겨 발음한다.
		//    (이 경우, 'ㅅ'은 된소리로 발음함)
		if (ret[i+3]==11) { // 다음 초성이 'ㅇ'일 경우
			switch(ret[i+2]) {
				case 1 :  // 'ㄱ'
					ret[i+2] = 0; ret[i+3] = 0; break;
				case 4 :  // 'ㄴ'
					ret[i+2] = 0; ret[i+3] = 2; break;
				case 7 :  // 'ㄷ'
					ret[i+2] = 0; ret[i+3] = 3; break;
				case 8 :  // 'ㄹ'
					ret[i+2] = 0; ret[i+3] = 5; break;
				case 16 : // 'ㅁ'
					ret[i+2] = 0; ret[i+3] = 6; break;
				case 17 : // 'ㅂ'
					ret[i+2] = 0; ret[i+3] = 7; break;
				case 2 :  // 'ㄲ'
					ret[i+2] = 1; ret[i+3] = 0; break;
				case 3 :  // 'ㄳ'
					ret[i+2] = 1; ret[i+3] = 10; break;
				case 5 :  // 'ㄵ'
					ret[i+2] = 4; ret[i+3] = 12; break;
				case 9 :  // 'ㄺ'
					ret[i+2] = 8; ret[i+3] = 0; break;
				case 10 : // 'ㄻ'
					ret[i+2] = 8; ret[i+3] = 6; break;
				case 11 : // 'ㄼ'
					ret[i+2] = 8; ret[i+3] = 7; break;
				case 12 : // 'ㄽ'
					ret[i+2] = 8; ret[i+3] = 10; break;
				case 13 : // 'ㄾ'
					ret[i+2] = 8; ret[i+3] = 16; break;
				case 14 : // 'ㄿ'
					ret[i+2] = 8; ret[i+3] = 17; break;
				case 18 : // 'ㅄ'
					ret[i+2] = 17; ret[i+3] = 10; break;
			}
		}
		
		// [표준 받침 소리 규칙]
		// 받침소리로는 'ㄱ,ㄴ,ㄷ,ㄹ,ㅁ,ㅂ,ㅇ'의 7개 자음만 발음한다.
		// (어말 또는 자음 앞에서 각 대표음으로 발음된다.)
		switch(ret[i+2]) {
			// 'ㅋ, ㄲ, ㄳ, ㄺ'         -> 'ㄱ'
			case 24 : case 2 : case 3 : case 9 :
				ret[i+2] = 1;								
				break;
			// 'ㄵ, ㄶ'                 -> 'ㄴ'
			case 5 : case 6 :
				ret[i+2] = 4;
				break;
			// 'ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ' -> 'ㄷ'
			case 19 : case 20 : case 22 : case 23 : case 25 : case 27 :
				ret[i+2] = 7;
				break;
			// 'ㄼ([ㅂ]), ㄽ, ㄾ, ㅀ'   -> 'ㄹ'
			case 11: case 12: case 13: case 15 :  
				ret[i+2] = 8;
				break;
			// 'ㄻ'                     -> 'ㅁ'
			case 10: 
				ret[i+2] = 16;
				break;
			// 'ㅍ, ㄼ, ㄿ, ㅄ'         -> 'ㅂ' // 'ㄼ'은 일반적으로 'ㄹ' (예외 참조)
			case 26: case 11: case 14: case 18 :
				ret[i+2] = 17;
				break;
		}

		// 설측음화 (종성과 초성이 'ㄹ'인 경우, 로마자 표기 ll로 표기함).
		if (ret[i+2] == 8 && ret[i+3] == 5) {
			ret[i+2] = 8;  // 종성: 'ㄹ'(l)
			ret[i+3] = 19; // 초성: 'ㄹ'(l)
		}
		
		// (???) 'ㄹ,ㄱ', 'ㄱ,ㄹ' -> 'ㄴ,ㄴ'
		if (ret[i+2] == 4 && ret[i+3] == 5 || ret[i+2] == 8 && ret[i+3] == 2) {
			ret[i+2] = 8;  // 종성: 'ㄹ'(l)
			ret[i+3] = 19; // 초성: 'ㄹ'(l)
		}
		
		// 자음 동화 
		// 비음화: 비음이 아닌 소리가 비음에 동화되어 같은 비음(ㅁ, ㄴ, ㅇ)으로 변하는 현상으로 결정적 변화에 속한다.
		if ((ret[i+2] == 1 || ret[i+2] == 24) && (ret[i+3] == 2 || ret[i+3] == 5 || ret[i+3] == 6))
			ret[i+2] = 21; // /ㄱ, ㅋ/ 소리가 /ㄴ, ㄹ, ㅁ/위에서 .ㅇ/소리로 변하는 경우 
		if ((ret[i+2] == 17 || ret[i+2] == 26) && (ret[i+3] == 2 || ret[i+3] == 5 || ret[i+3] == 6))
			ret[i+2] = 16; // /ㅂ, ㅍ/ 소리가 /ㄴ, ㄹ, ㅁ/위에서 /ㅁ/소리로 변하는 경우
		if ((ret[i+2] == 7 || ret[i+2] == 19 || ret[i+2] == 22 || ret[i+2] == 23 || ret[i+2] == 20 || ret[i+2] == 24 || ret[i+2] == 27) && (ret[i+3] == 2 || ret[i+3] == 6))
			ret[i+2] = 4; // /ㄷ, ㅅ, ㅈ, ㅊ, ㅌ, ㅎ, ㅆ/소리가 /ㄴ, ㅁ/위에서 /ㄴ/소리로 변하는 경우
		if ((ret[i+2] == 1 || ret[i+2] == 16 || ret[i+2] == 17 || ret[i+2] == 21) && (ret[i+3] == 5))
			ret[i+3] = 2; // /ㄹ/소리가 /ㄱ, ㅁ, ㅂ, ㅇ/아래에서 /ㄴ/소리로

	}
	
	return ret;
}
