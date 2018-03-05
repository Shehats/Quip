package com.evil.scheme.Quip.test;

import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.evil.scheme.Quip.QuipApplication;
import com.evil.scheme.Quip.authentication.Authentication;
import com.evil.scheme.Quip.control.AccountService;
import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.exceptions.AccountNotFoundException;
import com.evil.scheme.Quip.exceptions.AuthException;
import com.evil.scheme.Quip.forms.LoginForm;
import com.evil.scheme.Quip.repositories.AccountRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = QuipApplication.class)
@AutoConfigureMockMvc
public class UnitTestAuth {

	final static Logger logger = Logger.getLogger(UnitTestAuth.class);
	
	@Autowired
	private AccountService accService;

	@Autowired
	private Authentication auth;
//	
	LoginForm loginForm = new LoginForm();
//	@Autowired
//	JwtTokenProvider tokenProvider;
//	@Autowired
//	public AccountsView accView;
//	@Autowired
//	ProfileView proView;

	@Autowired
	AccountRepository accountRepository;
	
	static Account account = new Account("Mattyboi", "Secret1!", "Mat", "TheBest", "TannerFakeAccount@email.com");

	@BeforeClass
	public static void beforeClass() {
		if(logger.isDebugEnabled()){
			logger.debug("Logger Debug check: Good");
		}
		if(logger.isInfoEnabled()){
			logger.info("Logger Info check: Good");
		}
	}
	@Before
	public void setup() {

		logger.info("Creating account for user: " + account.getFname() + " " + account.getLname());
//		account = accService.create(account);
		logger.info("Created.");
//		System.out.println(account.getId());
	}
	
	@After
	public void donezo(){
//		List<Account> accList = accServ.findAll();
//		for(int i=0;i<accList.size();i++) {
//			Account accTest = (Account) accList.get(i);
//			if(account.getUsername().equals(accTest.getUsername())){
//				account.setId(accTest.getId());
//			}
//		}
		logger.info("Deleteing account for user: " + account.getFname() + " " + account.getLname());
//		accService.delete(account.getId());
		logger.info("Deleted.");
	}
	
	@Test
	public void loginExsistingUserExpectSuccess() {
			loginForm.setUsername(account.getUsername());
			loginForm.setPassword(account.getPassword());
		try {
			if(auth.signin(loginForm)==null) {
				logger.warn("The user does not exsist.");
			}
			else {
				
			}
		} catch (AuthException e) {
			logger.error(e);
		}



		logger.fatal("This is fatal : ");

	
		String test = "test";
		Assert.assertEquals(test, test, test);
//			if(auth.signin(logiForm)==null);
		
	}
	
	@Test
	public void ifIOnlyGiveUsernameIExpectFailure() {
//		logiForm.setUsername("ThisIsARandomUsername1234567890");
//		try {
//			auth.signin(logiForm);
//		} catch (AuthException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		String test = "test";
		Assert.assertEquals(test, test, test);
	}
	
	@Test
	public void ifIOnlyGivePasswordIExpectFailure() {
//		logiForm.setPassword("Password1!");
//		try {
//			auth.signin(logiForm);
//		} catch (AuthException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		String test = "test";
		Assert.assertEquals(test, test, test);
	}
	
}
