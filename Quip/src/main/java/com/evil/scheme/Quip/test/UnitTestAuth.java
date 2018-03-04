package com.evil.scheme.Quip.test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import com.evil.scheme.Quip.QuipApplication;
import com.evil.scheme.Quip.authentication.Authentication;
import com.evil.scheme.Quip.control.AccountService;
import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.accounts.Role;
import com.evil.scheme.Quip.exceptions.AccountNotFoundException;
import com.evil.scheme.Quip.exceptions.AuthException;
import com.evil.scheme.Quip.forms.LoginForm;
import com.evil.scheme.Quip.repositories.AccountRepository;
import com.evil.scheme.Quip.security.JwtTokenProvider;
import com.evil.scheme.Quip.views.AccountsView;
import com.evil.scheme.Quip.views.ProfileView;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = QuipApplication.class)
public class UnitTestAuth {

//	@TestConfiguration
//	static class UnitTestAuthTestContextConfiguration {
//		
//		@Bean
//		public AccountService accServ() {
//			return new AccountServiceImpl(); 
//		}
//		
//		@Bean
//		public Authentication auth() {
//			return new Authentication();
//		}
//		
//		@Bean
//		public AccountsView accView() {
//			return new AccountsView();
//		}
//		
//		@Bean
//		public ProfileView proView() {
//			return new ProfileView();
//		}
//
//		@Bean
//		public LoginForm logiForm() {
//			return new LoginForm();
//		}
//		
//		@Bean
//		public JwtTokenProvider tokenProvider() {
//			return new JwtTokenProvider();
//		}
//		
//	}
	
	@Autowired
	private AccountService accServ;
	
	@Autowired
	Authentication auth;
	
	LoginForm logiForm = new LoginForm();
	@Autowired
	JwtTokenProvider tokenProvider;
	@Autowired
	public AccountsView accView;
	@Autowired
	ProfileView proView;
	@MockBean
	AccountRepository accountRepository;
	
	
	@Before
	public void setup() {
		Account account = new Account();
		account.setEmail("TannerFakeAccount@email.com");
		account.setFname("Mat");
		account.setLname("TheBest");
		account.setPassword("Secret1!");
		account.setUsername("Mattyboi");
		account.setId((long) 109109109);
		account.setRoles(new ArrayList<Role>(Arrays.asList(Role.ROLE_CLIENT)));
		accServ.create(account);
	}
	
	@After
	public void donezo() throws AccountNotFoundException {
		Account account = null;
		List accList = (List) accServ.findAll();
		for(int i=0;i<accList.size();i++) {
			Account accTest = (Account) accList.get(i);
			if(account.getUsername().equals(accTest.getUsername())){
				account.setId(accTest.getId());
			}
		}
		accServ.delete(account.getId());
	}
	
	@Test
	public void testWhenIGiveNothingIExpectFailure() {
		try {
			auth.signin(logiForm);
		} catch (AuthException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void ifIOnlyGiveUsernameIExpectFailure() {
		logiForm.setUsername("ThisIsARandomUsername1234567890");
		try {
			auth.signin(logiForm);
		} catch (AuthException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void ifIOnlyGivePasswordIExpectFailure() {
		logiForm.setPassword("Password1!");
		try {
			auth.signin(logiForm);
		} catch (AuthException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
